import { FC, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Project, Task, TaskColumn, User } from '../../data/types';
import { TaskBoard } from './TaskBoard';
import { TaskModal } from './TaskModal';
import { DropResult } from '@hello-pangea/dnd';

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

interface ProjectTask extends Task {
  projectId: string;
}

interface Props {
  projectId: string;
  onProgressUpdate?: (progress: number) => void;
  users: User[];
}

export const ProjectTasks: FC<Props> = ({ projectId, onProgressUpdate, users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    const savedTasks = localStorage.getItem(`project_${projectId}_tasks`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`project_${projectId}_tasks`, JSON.stringify(tasks));

    // Calculate and update progress
    if (tasks.length > 0) {
      const completedTasks = tasks.filter((task) => task.status === 'done').length;
      const progress = Math.round((completedTasks / tasks.length) * 100);
      onProgressUpdate?.(progress);
    }
  }, [tasks, projectId, onProgressUpdate]);

  const columns = useMemo<TaskColumn[]>(
    () => [
      {
        id: 'todo',
        title: 'To Do',
        status: 'todo',
        tasks: tasks.filter((task) => task.status === 'todo' && task.projectId === projectId),
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        status: 'in-progress',
        tasks: tasks.filter(
          (task) => task.status === 'in-progress' && task.projectId === projectId
        ),
      },
      {
        id: 'review',
        title: 'In Review',
        status: 'review',
        tasks: tasks.filter((task) => task.status === 'review' && task.projectId === projectId),
      },
      {
        id: 'done',
        title: 'Done',
        status: 'done',
        tasks: tasks.filter((task) => task.status === 'done' && task.projectId === projectId),
      },
    ],
    [tasks, projectId]
  );

  const handleTaskMove = (result: DropResult) => {
    if (!result.destination) return;

    const sourceColumnId = result.source.droppableId;
    const destColumnId = result.destination.droppableId;
    const taskId = result.draggableId;

    // Find the task that was moved
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Update the task's status based on the destination column
    const newStatus = columns.find((col) => col.id === destColumnId)?.status;
    if (!newStatus) return;

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
            }
          : t
      )
    );
  };

  const handleAddTask = (columnId: string) => {
    setSelectedTask(undefined);
    setSelectedColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setSelectedColumnId(task.status);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      // Edit existing task
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === selectedTask.id ? { ...t, ...taskData } : t))
      );
    } else {
      // Add new task
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          ...taskData,
          id: crypto.randomUUID(),
          projectId: projectId,
          status: selectedColumnId as Task['status'],
          createdAt: new Date().toISOString(),
        } as ProjectTask,
      ]);
    }
  };

  return (
    <Section>
      <SectionTitle>Tasks</SectionTitle>
      <TaskBoard
        columns={columns}
        users={users}
        onTaskMove={handleTaskMove}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={selectedTask}
        users={users}
        columnId={selectedColumnId}
      />
    </Section>
  );
};
