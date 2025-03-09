import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegCalendarAlt, FaRegCheckCircle } from 'react-icons/fa';
import { BsClockHistory, BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { IoIosStats } from 'react-icons/io';

const Card = styled(Link)`
  display: block;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #93c5fd;
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  transition: color 0.3s;

  &:hover {
    color: #2563eb;
  }
`;

const StatusBadge = styled.span<{ status: Project['status'] }>`
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;

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

const Description = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ProgressText = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.25rem;
    color: #3b82f6;
  }
`;

const ProgressValue = styled.span`
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.625rem;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  border-radius: 9999px;
  background-color: ${({ progress }) => (progress === 100 ? '#22c55e' : '#2563eb')};
  width: ${({ progress }) => `${progress}%`};
`;

const DateSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;
`;

const DateText = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.25rem;
    color: #60a5fa;
  }
`;

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
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return <BsPlayFill />;
      case 'completed':
        return <FaRegCheckCircle />;
      case 'on-hold':
        return <BsPauseFill />;
    }
  };

  return (
    <Card to={`/projects/${project.id}`}>
      <CardHeader>
        <Title>{project.title}</Title>
        <StatusBadge status={project.status}>
          {getStatusIcon(project.status)}
          {project.status}
        </StatusBadge>
      </CardHeader>
      <Description>{project.description}</Description>
      <ProgressSection>
        <ProgressHeader>
          <ProgressText>
            <IoIosStats /> Progress
          </ProgressText>
          <ProgressValue>{project.progress}%</ProgressValue>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill progress={project.progress} />
        </ProgressBar>
        <DateSection>
          <DateText>
            <FaRegCalendarAlt />
            {new Date(project.startDate).toLocaleDateString()}
          </DateText>
          {project.endDate && (
            <DateText>
              <BsClockHistory />
              {new Date(project.endDate).toLocaleDateString()}
            </DateText>
          )}
        </DateSection>
      </ProgressSection>
    </Card>
  );
};
