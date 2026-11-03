import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import Dashboard from "../_views/dashboard";
import Analytics, { metadata as analyticsMeta } from "../_views/analytics";
import Applications, { metadata as applicationsMeta } from "../_views/applications";
import ApplicationDetail, { metadata as applicationDetailMeta } from "../_views/application-detail";
import Audit, { metadata as auditMeta } from "../_views/audit";
import Jobs, { metadata as jobsMeta } from "../_views/jobs";
import JobEdit, { metadata as jobEditMeta } from "../_views/job-edit";
import JobNew, { metadata as jobNewMeta } from "../_views/job-new";
import Messages, { metadata as messagesMeta } from "../_views/messages";
import MessageDetail, { metadata as messageDetailMeta } from "../_views/message-detail";
import Settings, { metadata as settingsMeta } from "../_views/settings";
import Trash, { metadata as trashMeta } from "../_views/trash";

/**
 * Single catch-all route for the whole admin panel. Cloudflare Pages (next-on-pages) bundles every dynamic
 * route as its own copy of the Next runtime (~1.7 MB each); one function instead of twelve keeps the
 * Pages Functions bundle under its 25 MiB limit. Views live in ../_views and are plain page components.
 */
type Query = Promise<Record<string, string | string[] | undefined>>;
type View = { Component: ComponentType<any>; title?: string; id?: string };

function resolve(slug: string[] = []): View | null {
  const [a, b, ...rest] = slug;
  if (rest.length) return null;
  if (!a) return { Component: Dashboard };
  if (a === "analytics" && !b) return { Component: Analytics, title: analyticsMeta.title };
  if (a === "audit" && !b) return { Component: Audit, title: auditMeta.title };
  if (a === "settings" && !b) return { Component: Settings, title: settingsMeta.title };
  if (a === "trash" && !b) return { Component: Trash, title: trashMeta.title };
  if (a === "applications") return b ? { Component: ApplicationDetail, title: applicationDetailMeta.title, id: b } : { Component: Applications, title: applicationsMeta.title };
  if (a === "messages") return b ? { Component: MessageDetail, title: messageDetailMeta.title, id: b } : { Component: Messages, title: messagesMeta.title };
  if (a === "jobs") {
    if (!b) return { Component: Jobs, title: jobsMeta.title };
    if (b === "new") return { Component: JobNew, title: jobNewMeta.title };
    return { Component: JobEdit, title: jobEditMeta.title, id: b };
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const view = resolve((await params).slug);
  return view?.title ? { title: view.title } : {};
}

export default async function AdminCatchAll({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Query;
}) {
  const view = resolve((await params).slug);
  if (!view) notFound();
  const { Component, id } = view;
  return <Component params={Promise.resolve({ id })} searchParams={searchParams} />;
}
