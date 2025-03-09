import { Team } from './types';

export const teams: Team[] = [
  {
    id: 't1',
    name: 'Frontend Development',
    description: 'Responsible for building and maintaining the user interface',
    members: ['u2', 'u3'],
    lead: 'u2',
  },
  {
    id: 't2',
    name: 'Backend Development',
    description: 'Handles server-side logic and database management',
    members: ['u4', 'u5'],
    lead: 'u5',
  },
  {
    id: 't3',
    name: 'Design Team',
    description: 'Creates user experience and interface designs',
    members: [],
    lead: 'u1',
  },
];
