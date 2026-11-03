import type { ApplicationStatus } from "./types";

/** Candidate email templates (client-safe). {name}, {role} and {company} are filled in before the admin edits and sends. */
export type CandidateTemplate = {
  id: string;
  label: string;
  subject: string;
  body: string;
  /** Status the application moves to if the admin ticks "also update the status". */
  status?: ApplicationStatus;
};

const SIGN_OFF = "Kind regards,\nThe {company} hiring team";

export const CANDIDATE_TEMPLATES: CandidateTemplate[] = [
  {
    id: "acknowledged",
    label: "Application received",
    subject: "We have received your application for {role}",
    body: `Hi {name},\n\nThank you for applying for the {role} position at {company}. We have received your application and a member of the team will review it shortly.\n\nIf your profile matches what we are looking for, we will be in touch to arrange the next step. We aim to reply within 5 business days.\n\n${SIGN_OFF}`,
    status: "reviewing",
  },
  {
    id: "interview",
    label: "Invitation to interview",
    subject: "Next steps for your {role} application",
    body: `Hi {name},\n\nThank you for your interest in the {role} position at {company}. We enjoyed reading about your background and would like to invite you to an introductory conversation.\n\nCould you let us know which of the following times suit you?\n- [option 1]\n- [option 2]\n- [option 3]\n\nThe conversation will take about 30 minutes by video call.\n\n${SIGN_OFF}`,
    status: "shortlisted",
  },
  {
    id: "rejected",
    label: "Not moving forward",
    subject: "Your application for {role} at {company}",
    body: `Hi {name},\n\nThank you for taking the time to apply for the {role} position at {company}, and for the interest you have shown in us.\n\nAfter careful consideration we have decided not to move forward with your application on this occasion. This is not a reflection on your abilities, and we received many strong applications.\n\nWe will keep your details on file for 12 months and may get in touch if a suitable role opens up. If you would rather we deleted them, just reply to this email.\n\nWe wish you every success in your search.\n\n${SIGN_OFF}`,
    status: "rejected",
  },
  {
    id: "custom",
    label: "Custom message",
    subject: "Your {role} application",
    body: `Hi {name},\n\n\n\n${SIGN_OFF}`,
  },
];

export function renderTemplate(t: CandidateTemplate, vars: { name: string; role: string; company?: string }) {
  const fill = (s: string) =>
    s.replaceAll("{name}", vars.name.split(" ")[0] || vars.name).replaceAll("{role}", vars.role).replaceAll("{company}", vars.company ?? "Data Consulting Group");
  return { subject: fill(t.subject), body: fill(t.body) };
}

/** Normalise user-entered tags: lowercase, simple characters, max 10 of 24 characters. */
export function normalizeTags(input: string): string[] {
  const seen = new Set<string>();
  for (const raw of input.split(",")) {
    const tag = raw.toLowerCase().replace(/[^a-z0-9 -]/g, "").trim().replace(/\s+/g, " ").slice(0, 24);
    if (tag) seen.add(tag);
  }
  return [...seen].slice(0, 10);
}
