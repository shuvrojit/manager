import { FC, useState } from 'react';
import styled from 'styled-components';
import { Task, TaskColumn, User } from '../../data/types';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { FaRegClock, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';

// Wrapper to ensure full width
const BoardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

// Scrollable container for the board
const BoardContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  width: 100%;
  min-width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;

  /* Custom scrollbar styling for webkit browsers */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
`;

const Column = styled.div`
  background: #f3f4f6;
  border-radius: 0.5rem;
  min-width: 300px;
  max-width: 300px;
  padding: 1rem;
  flex-shrink: 0; /* Prevent columns from shrinking */
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
`;

const TaskCount = styled.span`
  background: #e5e7eb;
  color: #4b5563;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const TaskCard = styled.div<{ isDragging: boolean }>`
  background: white;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: ${({ isDragging }) =>
    isDragging ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.05)'};
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const TaskTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
`;

const TaskLabels = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const Label = styled.span<{ color?: string }>`
  background: ${({ color }) => color || '#e5e7eb'};
  color: ${({ color }) => (color ? 'white' : '#4b5563')};
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  font-size: 0.75rem;
`;

const AddTaskButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: #e5e7eb;
  border: none;
  border-radius: 0.375rem;
  color: #4b5563;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #d1d5db;
  }
`;

const AssigneeAvatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

const PriorityIndicator = styled.span<{ priority: Task['priority'] }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.25rem;
  background-color: ${({ priority }) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  }};
`;

interface Props {
  columns: TaskColumn[];
  users: User[];
  onTaskMove: (result: DropResult) => void;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
}

export const TaskBoard: FC<Props> = ({
  columns,
  users,
  onTaskMove,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const getLabelColor = (label: string) => {
    const colors = {
      bug: '#ef4444',
      feature: '#3b82f6',
      improvement: '#10b981',
      documentation: '#8b5cf6',
      design: '#f59e0b',
    };
    return colors[label.toLowerCase() as keyof typeof colors];
  };

  const getAssigneeAvatar = (assigneeId?: string) => {
    if (!assigneeId) return null;
    const user = users.find((u) => u.id === assigneeId);
    return user ? <AssigneeAvatar src={user.avatar} alt={user.name} title={user.name} /> : null;
  };

  return (
    <BoardWrapper>
      <DragDropContext onDragEnd={onTaskMove}>
        <BoardContainer>
          {columns.map((column) => (
            <Column key={column.id}>
              <ColumnHeader>
                <ColumnTitle>{column.title}</ColumnTitle>
                <TaskCount>{column.tasks.length}</TaskCount>
              </ColumnHeader>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <TaskCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                          >
                            <TaskTitle>{task.title}</TaskTitle>
                            {task.labels && task.labels.length > 0 && (
                              <TaskLabels>
                                {task.labels.map((label) => (
                                  <Label key={label} color={getLabelColor(label)}>
                                    {label}
                                  </Label>
                                ))}
                              </TaskLabels>
                            )}
                            <TaskMeta>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <PriorityIndicator priority={task.priority} />
                                {task.dueDate && (
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.25rem',
                                    }}
                                  >
                                    <FaRegClock />
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {getAssigneeAvatar(task.assignee)}
                                <button
                                  onClick={() => onEditTask(task)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                  }}
                                >
                                  <FaPencilAlt />
                                </button>
                                <button
                                  onClick={() => onDeleteTask(task.id, column.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    color: '#ef4444',
                                  }}
                                >
                                  <FaRegTrashAlt />
                                </button>
                              </div>
                            </TaskMeta>
                          </TaskCard>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <AddTaskButton onClick={() => onAddTask(column.id)}>+ Add Task</AddTaskButton>
                  </div>
                )}
              </Droppable>
            </Column>
          ))}
        </BoardContainer>
      </DragDropContext>
    </BoardWrapper>
  );
};
