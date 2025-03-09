import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Project } from '../data/types';
import { projects, users } from '../data';
import { ProjectDropdown } from '../components/project/ProjectDropdown';
import {
  FaRegCalendarAlt,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaExclamationCircle,
} from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #4b5563;
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  background-color: #f9fafb;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;

  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
`;

const DueDateItem = styled(DateItem)<{ daysUntilDue?: number }>`
  ${({ daysUntilDue }) => {
    if (daysUntilDue !== undefined) {
      if (daysUntilDue <= 3) {
        return `
          background-color: #fee2e2;
          color: #b91c1c;
          font-weight: 500;
          animation: pulse 2s infinite;
          
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
        `;
      } else if (daysUntilDue <= 7) {
        return `
          background-color: #fef3c7;
          color: #92400e;
          font-weight: 500;
        `;
      }
    }
    return '';
  }}
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

// Helper function to calculate days until due date
const getDaysUntilDueDate = (endDate: string | undefined): number | undefined => {
  if (!endDate) return undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(endDate);
  dueDate.setHours(0, 0, 0, 0);

  const timeDiff = dueDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const ProjectDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Container>
        <NotFound>
          <Title>Project not found</Title>
          <BackButton onClick={() => navigate('/projects')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
          </BackButton>
        </NotFound>
      </Container>
    );
  }

  const daysUntilDue = getDaysUntilDueDate(project.endDate);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/projects')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
        </BackButton>
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
            <DateItem>
              <FaRegCalendarAlt />
              Started: {new Date(project.startDate).toLocaleDateString()}
            </DateItem>
            {project.endDate && (
              <DueDateItem daysUntilDue={daysUntilDue}>
                {daysUntilDue !== undefined && daysUntilDue <= 3 ? (
                  <FaExclamationCircle />
                ) : daysUntilDue !== undefined && daysUntilDue <= 7 ? (
                  <FaExclamationTriangle />
                ) : (
                  <FaCalendarCheck />
                )}
                Due: {new Date(project.endDate).toLocaleDateString()}
                {daysUntilDue !== undefined && daysUntilDue <= 3 && (
                  <span style={{ marginLeft: '0.5rem' }}>
                    (
                    {daysUntilDue === 0
                      ? 'Due today!'
                      : `${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''} left!`}
                    )
                  </span>
                )}
                {daysUntilDue !== undefined && daysUntilDue > 3 && daysUntilDue <= 7 && (
                  <span style={{ marginLeft: '0.5rem' }}>({daysUntilDue} days left)</span>
                )}
              </DueDateItem>
            )}
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
