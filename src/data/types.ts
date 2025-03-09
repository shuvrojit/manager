export interface User {
  id: string;
  name: string;
  email: string;
  personalEmail?: string;
  avatar: string;
  role: 'admin' | 'manager' | 'developer';
  team?: string;
  about?: string;
  skills?: string[];
  location?: string;
  phoneNumber?: string;
  timezone?: string;
  github?: string;
  linkedin?: string;
  preferredWorkingHours?: {
    start: string;
    end: string;
  };
  communicationPreferences?: {
    slackNotifications: boolean;
    emailNotifications: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  startDate: string;
  endDate?: string;
  team: string[];
  tags: string[];
  progress: number;
  priority: 'low' | 'medium' | 'high';
  budget?: number;
  timeSpent?: string;
  timeRemaining?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: string[]; // User IDs
  lead: string; // User ID
}
