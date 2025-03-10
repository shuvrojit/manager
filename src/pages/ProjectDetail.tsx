import { FC, useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Project, Task, TaskColumn } from '../data/types';
import { DropResult } from '@hello-pangea/dnd';
import { projects, users } from '../data';
import { TaskBoard } from '../components/project/TaskBoard';
import { TaskModal } from '../components/project/TaskModal';
import { ProjectTasks } from '../components/project/ProjectTasks';
import {
  FaRegCalendarAlt,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaExclamationCircle,
} from 'react-icons/fa';

const Container = styled.div`
  padding: 1.5rem;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
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
  flex-shrink: 0;

  &:hover {
    background-color: #e5e7eb;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #4b5563;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 100%;
`;

const DateItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  background-color: #f9fafb;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  flex-shrink: 0;

  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
    flex-shrink: 0;
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
  max-width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #4b5563;
  overflow-wrap: break-word;
  word-break: break-word;
`;

// Helper function to calculate days until due date
const getDaysUntilDueDate = (targetEndDate: string | undefined): number | undefined => {
  if (!targetEndDate) return undefined;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(targetEndDate);
  dueDate.setHours(0, 0, 0, 0);

  const timeDiff = dueDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  max-width: 100%;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background: #e5e7eb;
  color: #4b5563;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

interface ProjectTask extends Task {
  projectId: string;
}

export const ProjectDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const project = projects.find((p) => p.id === id);

  const handleProgressUpdate = (progress: number) => {
    // Update project progress in localStorage
    if (project) {
      const updatedProject = { ...project, progress };
      const allProjects = projects.map((p) => (p.id === project.id ? updatedProject : p));
      localStorage.setItem('projects', JSON.stringify(allProjects));
    }
  };

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

  const daysUntilDue = getDaysUntilDueDate(project.targetEndDate);

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
        <Title>{project.name}</Title>
      </Header>

      <ProjectHeader>
        <DateInfo>
          <DateItem>
            <FaRegCalendarAlt />
            <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
          </DateItem>
          {project.targetEndDate && (
            <DueDateItem daysUntilDue={daysUntilDue}>
              {daysUntilDue !== undefined && daysUntilDue <= 3 ? (
                <FaExclamationCircle />
              ) : daysUntilDue !== undefined && daysUntilDue <= 7 ? (
                <FaExclamationTriangle />
              ) : (
                <FaCalendarCheck />
              )}
              <span>
                Due: {new Date(project.targetEndDate).toLocaleDateString()}
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
              </span>
            </DueDateItem>
          )}
        </DateInfo>
      </ProjectHeader>

      <Section>
        <SectionTitle>Description</SectionTitle>
        <Description>{project.description}</Description>
      </Section>

      <Section>
        <SectionTitle>Tags</SectionTitle>
        <TagsContainer>
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>
      </Section>

      {project.budget && (
        <Section>
          <SectionTitle>Budget</SectionTitle>
          <div style={{ fontSize: '1.25rem', color: '#047857' }}>
            ${project.budget.toLocaleString()}
          </div>
        </Section>
      )}

      <Section>
        <SectionTitle>Project Timeline</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <strong>Created:</strong> {new Date(project.createdAt).toLocaleString()} by{' '}
            {users.find((u) => u.id === project.createdBy)?.name}
          </div>
          <div>
            <strong>Last Updated:</strong> {new Date(project.updatedAt).toLocaleString()}
          </div>
          {project.actualEndDate && (
            <div>
              <strong>Completed:</strong> {new Date(project.actualEndDate).toLocaleString()}
            </div>
          )}
        </div>
      </Section>

      <Section>
        <SectionTitle>Client</SectionTitle>
        <div>Client ID: {project.clientId}</div>
      </Section>

      <ProjectTasks projectId={project.id} onProgressUpdate={handleProgressUpdate} users={users} />
    </Container>
  );
};
