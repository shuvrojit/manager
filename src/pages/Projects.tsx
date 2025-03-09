import { FC, useState } from 'react';
import styled from 'styled-components';
import { ProjectCard, type Project } from '../components/project/ProjectCard';
import { ProjectDropdown } from '../components/project/ProjectDropdown';

const Container = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

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
    <Container>
      <Header>
        <Title>Projects</Title>
      </Header>

      <ProjectGrid>
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectGrid>
    </Container>
  );
};
