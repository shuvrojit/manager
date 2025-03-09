import { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Project } from '../../data/types';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Container = styled.div`
  position: relative;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
`;

const DropdownButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 16rem;
  padding: 0.75rem 1rem;
  background: white;
  border: none;
  border-radius: 0.625rem;
  box-shadow: ${({ isOpen }) =>
    isOpen
      ? '0 4px 8px -2px rgba(59, 130, 246, 0.15), 0 2px 4px -1px rgba(59, 130, 246, 0.1)'
      : '0 1px 3px rgba(0, 0, 0, 0.08)'};
  transition: all 0.2s ease;

  &:hover {
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #374151;
    stroke-width: 2.5;
    transition: all 0.2s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`;

const ButtonText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
`;

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 10;
  width: 16rem;
  margin-top: 0.375rem;
  background: white;
  border: 1.5px solid #f3f4f6;
  border-radius: 0.625rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  opacity: 1;
  transform-origin: top;
  animation: dropdownFade 0.15s ease-out;

  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const DropdownContent = styled.div`
  padding: 0.375rem;
  max-height: 15rem;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const ProjectButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 0.625rem 0.875rem;
  margin: 0.125rem 0;
  text-align: left;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
  background: ${({ isSelected }) => (isSelected ? '#eff6ff' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? '#1d4ed8' : '#374151')};

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#e0f2fe' : '#f8fafc')};
  }

  &:focus {
    outline: none;
    background: ${({ isSelected }) => (isSelected ? '#e0f2fe' : '#f8fafc')};
  }
`;

const ProjectButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ProjectTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.9375rem;
  font-weight: 450;
`;

const StatusDot = styled.span<{ status: Project['status'] }>`
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 9999px;
  transition: all 0.2s ease;
  box-shadow: 0 0 0 2px
    ${({ status }) => {
      switch (status) {
        case 'active':
          return 'rgba(34, 197, 94, 0.15)';
        case 'completed':
          return 'rgba(59, 130, 246, 0.15)';
        case 'on-hold':
          return 'rgba(234, 179, 8, 0.15)';
        case 'cancelled':
          return 'rgba(239, 68, 68, 0.15)';
      }
    }};
  background-color: ${({ status }) => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'completed':
        return '#3b82f6';
      case 'on-hold':
        return '#eab308';
      case 'cancelled':
        return '#ef4444';
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
        <ButtonText>{selectedProject ? selectedProject.name : 'Select Project'}</ButtonText>
        <ChevronDownIcon strokeWidth={3} />
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
                  <ProjectTitle>{project.name}</ProjectTitle>
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
