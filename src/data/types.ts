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
  tasks?: ProjectTask[];
}

export interface ProjectTask extends Task {
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string; // User ID
  createdAt: string;
  dueDate?: string;
  labels?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: string[]; // User IDs
  lead: string; // User ID
}

export interface TaskColumn {
  id: string;
  title: string;
  status: Task['status'];
  tasks: Task[];
}
