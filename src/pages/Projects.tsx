import { FC, useState } from 'react';
import { ProjectCard, type Project } from '../components/project/ProjectCard';
import { ProjectDropdown } from '../components/project/ProjectDropdown';

// Mock data - replace with real API call
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    status: 'active',
    progress: 75,
    description: 'Modernizing our company website with new design and features.',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
  },
  {
    id: '2',
    title: 'Mobile App Development',
    status: 'on-hold',
    progress: 30,
    description: 'Creating a new mobile app for our customers.',
    startDate: '2024-02-01',
  },
  {
    id: '3',
    title: 'Data Migration',
    status: 'completed',
    progress: 100,
    description: 'Migrating data from legacy systems to new cloud infrastructure.',
    startDate: '2024-01-01',
    endDate: '2024-02-28',
  },
];

export const ProjectsPage: FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(mockProjects[0]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <ProjectDropdown
          projects={mockProjects}
          selectedProject={selectedProject}
          onProjectSelect={setSelectedProject}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
