import { FC } from 'react';
import styled from 'styled-components';
import { projects } from '../data';
import { ProjectCard } from '../components/project/ProjectCard';
import { ProjectDropdown } from '../components/project/ProjectDropdown';

const Container = styled.div`
  padding: 1.5rem;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden; /* Prevent horizontal scrolling */
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
  gap: 1rem; /* Reduced from 1.5rem for more compact layout */
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    gap: 1.5rem; /* Restore larger gap for bigger screens */
  }
`;

export const ProjectsPage: FC = () => {
  return (
    <Container>
      <Header>
        <Title>Projects</Title>
      </Header>

      <ProjectGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectGrid>
    </Container>
  );
};
