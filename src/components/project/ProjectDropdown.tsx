import { FC, useState, useRef, useEffect } from 'react';
import { Project } from './ProjectCard';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface ProjectDropdownProps {
  projects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
}

export const ProjectDropdown: FC<ProjectDropdownProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="truncate">
          {selectedProject ? selectedProject.title : 'Select Project'}
        </span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  onProjectSelect(project);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  selectedProject?.id === project.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{project.title}</span>
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      project.status === 'active'
                        ? 'bg-green-500'
                        : project.status === 'completed'
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
