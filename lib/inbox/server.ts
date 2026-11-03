import { addDoc, deleteDoc, FirestoreBytes, getDoc, queryDocs, setDoc, updateDoc } from "@/lib/firestore/rest";
import type { Application, ApplicationStatus, ContactMessage, MessageStatus } from "./types";

type NewApplication = Omit<Application, "id" | "status" | "notes" | "createdAt" | "updatedAt" | "cvFileName" | "cvSize">;
type NewMessage = Omit<ContactMessage, "id" | "status" | "notes" | "createdAt" | "updatedAt">;

const newestFirst = <T extends { createdAt: string }>(a: T, b: T) => b.createdAt.localeCompare(a.createdAt);

// ---- applications ----
export async function saveApplication(input: NewApplication): Promise<string> {
  const now = new Date().toISOString();
  return addDoc("applications", { ...input, status: "new", notes: "", createdAt: now, updatedAt: now });
}

export async function listApplications(limit = 500): Promise<Application[]> {
  const rows = await queryDocs<Omit<Application, "id">>("applications", {
    orderBy: { field: "createdAt", direction: "DESCENDING" },
    limit,
  });
  return rows as Application[];
}

export async function getApplication(id: string): Promise<Application | null> {
  return (await getDoc<Omit<Application, "id">>(`applications/${encodeURIComponent(id)}`)) as Application | null;
}

export async function updateApplication(
  id: string,
  patch: { status?: ApplicationStatus; notes?: string },
): Promise<void> {
  await updateDoc(`applications/${encodeURIComponent(id)}`, { ...patch, updatedAt: new Date().toISOString() });
}

export async function deleteApplication(id: string): Promise<void> {
  // Remove the uploaded CV with the application so no personal data is left behind.
  await deleteDoc(`applicationFiles/${encodeURIComponent(id)}`);
  await deleteDoc(`applications/${encodeURIComponent(id)}`);
}

// ---- CV files (kept in their own collection so application lists stay light) ----
export type CvFile = { fileName: string; contentType: string; size: number; data: string };

export async function saveCv(applicationId: string, cv: Omit<CvFile, "data"> & { base64: string }): Promise<void> {
  await setDoc(`applicationFiles/${encodeURIComponent(applicationId)}`, {
    applicationId,
    fileName: cv.fileName,
    contentType: cv.contentType,
    size: cv.size,
    data: new FirestoreBytes(cv.base64),
    createdAt: new Date().toISOString(),
  });
  await updateDoc(`applications/${encodeURIComponent(applicationId)}`, { cvFileName: cv.fileName, cvSize: cv.size });
}

export async function getCv(applicationId: string): Promise<CvFile | null> {
  return getDoc<CvFile>(`applicationFiles/${encodeURIComponent(applicationId)}`);
}

/** Delete rejected applications older than `months`. Returns how many were removed. */
export async function purgeRejectedApplications(months = 12): Promise<number> {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  const rejected = await queryDocs<Omit<Application, "id">>("applications", {
    where: [{ field: "status", op: "EQUAL", value: "rejected" }],
    limit: 500,
  });
  const expired = (rejected as Application[]).filter((a) => a.updatedAt < cutoff.toISOString());
  await Promise.all(expired.map((a) => deleteApplication(a.id)));
  return expired.length;
}

// ---- contact messages ----
export async function saveContactMessage(input: NewMessage): Promise<string> {
  const now = new Date().toISOString();
  return addDoc("contactMessages", { ...input, status: "new", notes: "", createdAt: now, updatedAt: now });
}

export async function listMessages(limit = 500): Promise<ContactMessage[]> {
  const rows = await queryDocs<Omit<ContactMessage, "id">>("contactMessages", {
    orderBy: { field: "createdAt", direction: "DESCENDING" },
    limit,
  });
  return rows as ContactMessage[];
}

export async function getMessage(id: string): Promise<ContactMessage | null> {
  return (await getDoc<Omit<ContactMessage, "id">>(`contactMessages/${encodeURIComponent(id)}`)) as ContactMessage | null;
}

export async function updateMessage(id: string, patch: { status?: MessageStatus; notes?: string }): Promise<void> {
  await updateDoc(`contactMessages/${encodeURIComponent(id)}`, { ...patch, updatedAt: new Date().toISOString() });
}

export async function deleteMessage(id: string): Promise<void> {
  await deleteDoc(`contactMessages/${encodeURIComponent(id)}`);
}

export { newestFirst };
