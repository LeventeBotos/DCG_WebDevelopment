import { SignJWT, importPKCS8 } from "jose";
import { firebaseProjectId } from "@/lib/firebase/config";

/**
 * Minimal edge-safe Firestore client over REST, authenticated with a service account.
 * firebase-admin cannot run on the Cloudflare Pages edge runtime, so we mint OAuth tokens with Web Crypto.
 * Server-side only. Security rules deny all client access; this is the only path to the data.
 */

type FirestoreValue =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { stringValue: string }
  | { bytesValue: string }
  | { referenceValue: string }
  | { timestampValue: string }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

type FirestoreDoc = { name: string; fields?: Record<string, FirestoreValue> };

const DOCS = `https://firestore.googleapis.com/v1/projects/${firebaseProjectId}/databases/(default)/documents`;

/** Wraps base64 data so it is stored as a Firestore bytes value (raw size counts toward the 1 MiB doc limit). */
/** A reference to another document path (used to filter/order by document id). */
export class FirestoreRef {
  constructor(public readonly path: string) {}
}

export class FirestoreBytes {
  constructor(public readonly base64: string) {}
}

export function encodeValue(v: unknown): FirestoreValue {
  if (v instanceof FirestoreBytes) return { bytesValue: v.base64 };
  if (v instanceof FirestoreRef) {
    return { referenceValue: `projects/${firebaseProjectId}/databases/(default)/documents/${v.path}` };
  }
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "number") {
    return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  }
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(encodeValue) } };
  if (typeof v === "object") return { mapValue: { fields: encodeFields(v as Record<string, unknown>) } };
  throw new Error(`Unsupported Firestore value type: ${typeof v}`);
}

export function encodeFields(obj: Record<string, unknown>): Record<string, FirestoreValue> {
  const out: Record<string, FirestoreValue> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = encodeValue(v);
  }
  return out;
}

export function decodeValue(v: FirestoreValue): unknown {
  if ("nullValue" in v) return null;
  if ("booleanValue" in v) return v.booleanValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("stringValue" in v) return v.stringValue;
  if ("bytesValue" in v) return v.bytesValue; // base64 string
  if ("timestampValue" in v) return new Date(v.timestampValue);
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(decodeValue);
  if ("mapValue" in v) return decodeFields(v.mapValue.fields ?? {});
  return null;
}

export function decodeFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)]));
}

function decodeDoc<T>(doc: FirestoreDoc): T & { id: string } {
  const id = doc.name.split("/").pop() as string;
  return { id, ...(decodeFields(doc.fields ?? {}) as T) };
}

// ---- service-account access token (cached per isolate, per scope) ----
const tokenCache = new Map<string, { token: string; exp: number }>();
const DATASTORE_SCOPE = "https://www.googleapis.com/auth/datastore";

/** Mint (or reuse) an OAuth access token for the service account. Also used by the GA4 reader. */
export async function getAccessToken(scope: string = DATASTORE_SCOPE): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const cached = tokenCache.get(scope);
  if (cached && cached.exp - 60 > now) return cached.token;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not set");
  const sa = JSON.parse(raw) as { client_email: string; private_key: string };

  const key = await importPKCS8(sa.private_key, "RS256");
  const assertion = await new SignJWT({ scope })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(sa.client_email)
    .setSubject(sa.client_email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`Service account token exchange failed (${res.status})`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache.set(scope, { token: json.access_token, exp: now + json.expires_in });
  return json.access_token;
}

async function call(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${DOCS}/${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init.headers },
  });
}

/** Read one document. Returns null when it does not exist. */
export async function getDoc<T = Record<string, unknown>>(path: string): Promise<(T & { id: string }) | null> {
  const res = await call(path);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore get ${path} failed (${res.status})`);
  return decodeDoc<T>((await res.json()) as FirestoreDoc);
}

/** Create or fully replace a document at a known path. */
export async function setDoc(path: string, data: Record<string, unknown>): Promise<void> {
  const res = await call(path, { method: "PATCH", body: JSON.stringify({ fields: encodeFields(data) }) });
  if (!res.ok) throw new Error(`Firestore set ${path} failed (${res.status})`);
}

/** Create a document with an auto-generated id; returns the id. */
export async function addDoc(collection: string, data: Record<string, unknown>): Promise<string> {
  const res = await call(collection, { method: "POST", body: JSON.stringify({ fields: encodeFields(data) }) });
  if (!res.ok) throw new Error(`Firestore add ${collection} failed (${res.status})`);
  return decodeDoc((await res.json()) as FirestoreDoc).id;
}

/** Create a document with a caller-chosen id. Returns false if it already exists (unique-id guarantee). */
export async function createDoc(
  collection: string,
  id: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  const res = await call(`${collection}?documentId=${encodeURIComponent(id)}`, {
    method: "POST",
    body: JSON.stringify({ fields: encodeFields(data) }),
  });
  if (res.status === 409) return false;
  if (!res.ok) throw new Error(`Firestore create ${collection}/${id} failed (${res.status})`);
  return true;
}

/** Update only the given top-level fields; other fields are left untouched. Fails if the doc is missing. */
export async function updateDoc(path: string, data: Record<string, unknown>): Promise<void> {
  const keys = Object.keys(data).filter((k) => data[k] !== undefined);
  if (keys.length === 0) return;
  const mask = keys.map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join("&");
  const res = await call(`${path}?${mask}&currentDocument.exists=true`, {
    method: "PATCH",
    body: JSON.stringify({ fields: encodeFields(data) }),
  });
  if (!res.ok) throw new Error(`Firestore update ${path} failed (${res.status})`);
}

export type QueryOptions = {
  where?: {
    field: string;
    op: "EQUAL" | "LESS_THAN" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN" | "GREATER_THAN_OR_EQUAL";
    value: unknown;
  }[];
  orderBy?: { field: string; direction?: "ASCENDING" | "DESCENDING" };
  limit?: number;
};

/** Run a structured query against one collection. Keep to a single orderBy and equality filters to avoid composite indexes. */
export async function queryDocs<T = Record<string, unknown>>(
  collection: string,
  options: QueryOptions = {},
): Promise<(T & { id: string })[]> {
  const filters = (options.where ?? []).map((w) => ({
    fieldFilter: { field: { fieldPath: w.field }, op: w.op, value: encodeValue(w.value) },
  }));
  const structuredQuery: Record<string, unknown> = { from: [{ collectionId: collection }] };
  if (filters.length === 1) structuredQuery.where = filters[0];
  if (filters.length > 1) structuredQuery.where = { compositeFilter: { op: "AND", filters } };
  if (options.orderBy) {
    structuredQuery.orderBy = [
      { field: { fieldPath: options.orderBy.field }, direction: options.orderBy.direction ?? "ASCENDING" },
    ];
  }
  if (options.limit) structuredQuery.limit = options.limit;

  const token = await getAccessToken();
  const res = await fetch(`${DOCS}:runQuery`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ structuredQuery }),
  });
  if (!res.ok) throw new Error(`Firestore query ${collection} failed (${res.status})`);
  const rows = (await res.json()) as { document?: FirestoreDoc }[];
  return rows.filter((r) => r.document).map((r) => decodeDoc<T>(r.document as FirestoreDoc));
}

/** Count documents in a collection, optionally with one equality filter. */
export async function countDocs(collection: string, where?: { field: string; value: unknown }): Promise<number> {
  const structuredQuery: Record<string, unknown> = { from: [{ collectionId: collection }] };
  if (where) {
    structuredQuery.where = {
      fieldFilter: { field: { fieldPath: where.field }, op: "EQUAL", value: encodeValue(where.value) },
    };
  }
  const token = await getAccessToken();
  const res = await fetch(`${DOCS}:runAggregationQuery`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ structuredAggregationQuery: { structuredQuery, aggregations: [{ alias: "n", count: {} }] } }),
  });
  if (!res.ok) throw new Error(`Firestore count ${collection} failed (${res.status})`);
  const rows = (await res.json()) as { result?: { aggregateFields?: { n?: { integerValue?: string } } } }[];
  return Number(rows[0]?.result?.aggregateFields?.n?.integerValue ?? 0);
}

/**
 * Atomically add to numeric counters on one document (created if missing) and return the NEW values.
 * Field names must be [A-Za-z0-9_]. Because the new value comes back in the same call, this is also safe to
 * use for rate limiting (no read-then-write race).
 */
export async function incrementCounters(
  path: string,
  increments: Record<string, number>,
): Promise<Record<string, number>> {
  const names = Object.keys(increments);
  const fieldTransforms = names.map((fieldPath) => {
    if (!/^[A-Za-z0-9_]+$/.test(fieldPath)) throw new Error(`Invalid counter field: ${fieldPath}`);
    return { fieldPath, increment: { integerValue: String(increments[fieldPath]) } };
  });
  const token = await getAccessToken();
  const res = await fetch(`${DOCS}:commit`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      writes: [
        {
          transform: {
            document: `projects/${firebaseProjectId}/databases/(default)/documents/${path}`,
            fieldTransforms,
          },
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Firestore increment ${path} failed (${res.status})`);
  const json = (await res.json()) as { writeResults?: { transformResults?: { integerValue?: string }[] }[] };
  const results = json.writeResults?.[0]?.transformResults ?? [];
  return Object.fromEntries(names.map((n, i) => [n, Number(results[i]?.integerValue ?? 0)]));
}

/**
 * One atomic write that sets some fields AND increments counters on a document (creating it if missing).
 * Returns the new counter values. `set` must not contain the counter fields.
 */
export async function upsertWithCounters(
  path: string,
  set: Record<string, unknown>,
  increments: Record<string, number>,
): Promise<Record<string, number>> {
  const names = Object.keys(increments);
  const updateTransforms = names.map((fieldPath) => {
    if (!/^[A-Za-z0-9_]+$/.test(fieldPath)) throw new Error(`Invalid counter field: ${fieldPath}`);
    return { fieldPath, increment: { integerValue: String(increments[fieldPath]) } };
  });
  const setKeys = Object.keys(set).filter((k) => set[k] !== undefined);
  const token = await getAccessToken();
  const res = await fetch(`${DOCS}:commit`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      writes: [
        {
          update: {
            name: `projects/${firebaseProjectId}/databases/(default)/documents/${path}`,
            fields: encodeFields(set),
          },
          updateMask: { fieldPaths: setKeys },
          updateTransforms,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Firestore upsert ${path} failed (${res.status})`);
  const json = (await res.json()) as { writeResults?: { transformResults?: { integerValue?: string }[] }[] };
  const results = json.writeResults?.[0]?.transformResults ?? [];
  return Object.fromEntries(names.map((n, i) => [n, Number(results[i]?.integerValue ?? 0)]));
}

export async function deleteDoc(path: string): Promise<void> {
  const res = await call(path, { method: "DELETE" });
  if (!res.ok && res.status !== 404) throw new Error(`Firestore delete ${path} failed (${res.status})`);
}
