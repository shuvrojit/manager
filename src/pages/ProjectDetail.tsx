import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Project } from '../data/types';
import { projects, users } from '../data';
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

export const ProjectDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);

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
        <Title>{project.name}</Title>
        <ProjectDropdown
          projects={projects}
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

        <Section>
          <SectionTitle>Team Members</SectionTitle>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.team.map((userId) => {
              const user = users.find((u) => u.id === userId);
              return user ? (
                <div
                  key={user.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    background: '#f3f4f6',
                    borderRadius: '0.375rem',
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      marginRight: '0.5rem',
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{user.role}</div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </Section>

        <Section>
          <SectionTitle>Tags</SectionTitle>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: '#e5e7eb',
                  color: '#4b5563',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </Section>

        {project.budget && (
          <Section>
            <SectionTitle>Budget</SectionTitle>
            <div style={{ fontSize: '1.25rem', color: '#047857' }}>
              ${project.budget.toLocaleString()}
            </div>
          </Section>
        )}
      </Card>
    </Container>
  );
};
