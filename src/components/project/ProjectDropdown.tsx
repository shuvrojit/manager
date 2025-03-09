import { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Project } from './ProjectCard';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Container = styled.div`
  position: relative;
`;

const DropdownButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 16rem;
  padding: 0 1rem;
  height: 1.25rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.2s;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const ButtonText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 10;
  width: 16rem;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const DropdownContent = styled.div`
  padding: 0.25rem 0;
  max-height: 15rem;
  overflow: auto;
`;

const ProjectButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background: ${({ isSelected }) => (isSelected ? '#eff6ff' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? '#1d4ed8' : '#374151')};

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#eff6ff' : '#f3f4f6')};
  }
`;

const ProjectButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusDot = styled.span<{ status: Project['status'] }>`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'completed':
        return '#3b82f6';
      case 'on-hold':
        return '#eab308';
      default:
        return '#d1d5db';
    }
  }};
`;

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
    <Container ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <ButtonText>{selectedProject ? selectedProject.title : 'Select Project'}</ButtonText>
        <ChevronDownIcon />
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          <DropdownContent>
            {projects.map((project) => (
              <ProjectButton
                key={project.id}
                onClick={() => {
                  onProjectSelect(project);
                  setIsOpen(false);
                }}
                isSelected={selectedProject?.id === project.id}
              >
                <ProjectButtonContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <StatusDot status={project.status} />
                </ProjectButtonContent>
              </ProjectButton>
            ))}
          </DropdownContent>
        </DropdownMenu>
      )}
    </Container>
  );
};
