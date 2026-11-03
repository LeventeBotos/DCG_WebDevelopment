export const APPLICATION_STATUSES = ["new", "reviewing", "shortlisted", "rejected", "hired"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const MESSAGE_STATUSES = ["new", "read", "replied", "archived"] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  location: string;
  linkedin: string;
  portfolio: string;
  resumeUrl: string;
  /** Uploaded CV (stored in applicationFiles/{id}). Empty/0 when the applicant gave a link instead. */
  cvFileName?: string;
  cvSize?: number;
  experience: string;
  noticePeriod: string;
  message: string;
  status: ApplicationStatus;
  notes: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  ipHash: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  topic: string;
  message: string;
  status: MessageStatus;
  notes: string;
  ipHash: string | null;
  createdAt: string;
  updatedAt: string;
};
