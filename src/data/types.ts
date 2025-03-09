export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'developer';
  team?: string;
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
