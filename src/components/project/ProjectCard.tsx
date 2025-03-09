import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface Project {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  description: string;
  startDate: string;
  endDate?: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
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
    <Link
      to={`/projects/${project.id}`}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }} />
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
          {project.endDate && <span>End: {new Date(project.endDate).toLocaleDateString()}</span>}
        </div>
      </div>
    </Link>
  );
};
