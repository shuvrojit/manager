import { User } from './types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    role: 'admin',
  },
  {
    id: 'u2',
    name: 'Michael Rodriguez',
    email: 'michael.r@company.com',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    role: 'manager',
    team: 't1',
  },
  {
    id: 'u3',
    name: 'Emily Watson',
    email: 'emily.w@company.com',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    role: 'developer',
    team: 't1',
  },
  {
    id: 'u4',
    name: 'James Kim',
    email: 'james.kim@company.com',
    avatar: 'https://i.pravatar.cc/150?u=james',
    role: 'developer',
    team: 't2',
  },
  {
    id: 'u5',
    name: 'Priya Patel',
    email: 'priya.p@company.com',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    role: 'manager',
    team: 't2',
  },
];
