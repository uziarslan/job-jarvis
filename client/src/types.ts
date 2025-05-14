export type Route =
  | "Dashboard"
  | "Settings"
  | "Profile"
  | "History"
  | "Templates"
  | "Jobs"
  | "Saved Searches"
  | "Manual Job Proposal"
  | "Reviews";

export interface BusinessObject {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template extends BusinessObject {
  title: string;
  description: string;
  content: string;
  userId: number;
}

export type Job = {
  title: string;
  description: string;
  budget: string;
  duration: string;
  location: string;
  postedAt: string;
  skills: string[];
  jobType: string;
  contractorTier: string;
  proposals: string;
  clientInfo: {
    rating?: string;
    totalSpent?: string;
    jobsPosted?: string;
  };
};
