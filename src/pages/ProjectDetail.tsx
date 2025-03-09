import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Project } from '../components/project/ProjectCard';
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

const NotFound = styled.div`
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.5rem;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const StatusBadge = styled.span<{ status: Project['status'] }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;

  ${({ status }) => {
    switch (status) {
      case 'active':
        return 'background-color: #dcfce7; color: #166534;';
      case 'completed':
        return 'background-color: #dbeafe; color: #1e40af;';
      case 'on-hold':
        return 'background-color: #fef3c7; color: #92400e;';
    }
  }}
`;

const DateInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;

  span + span {
    margin-left: 1rem;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #4b5563;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #2563eb;
  border-radius: 9999px;
  width: ${({ progress }) => `${progress}%`};
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

export const ProjectDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <Container>
        <NotFound>
          <Title>Project not found</Title>
          <BackButton onClick={() => navigate('/projects')}>Back to Projects</BackButton>
        </NotFound>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{project.title}</Title>
        <ProjectDropdown
          projects={mockProjects}
          selectedProject={project}
          onProjectSelect={(newProject) => navigate(`/projects/${newProject.id}`)}
        />
      </Header>

      <Card>
        <CardHeader>
          <StatusBadge status={project.status}>{project.status}</StatusBadge>
          <DateInfo>
            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
            {project.endDate && <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>}
          </DateInfo>
        </CardHeader>

        <Section>
          <SectionTitle>Description</SectionTitle>
          <Description>{project.description}</Description>
        </Section>

        <ProgressSection>
          <ProgressHeader>
            <span>Progress</span>
            <span>{project.progress}%</span>
          </ProgressHeader>
          <ProgressBar>
            <ProgressFill progress={project.progress} />
          </ProgressBar>
        </ProgressSection>
      </Card>
    </Container>
  );
};
