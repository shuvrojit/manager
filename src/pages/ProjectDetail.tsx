import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project } from '../components/project/ProjectCard';
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

export const ProjectDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
        <ProjectDropdown
          projects={mockProjects}
          selectedProject={project}
          onProjectSelect={(newProject) => navigate(`/projects/${newProject.id}`)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
          <div className="text-sm text-gray-500">
            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
            {project.endDate && (
              <span className="ml-4">Due: {new Date(project.endDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600">{project.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
