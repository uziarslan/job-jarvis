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
