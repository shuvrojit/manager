import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Task, User } from '../../data/types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #111827;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    ring: 2px solid rgba(37, 99, 235, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  min-height: 6rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
    ring: 2px solid rgba(37, 99, 235, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    ring: 2px solid rgba(37, 99, 235, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  min-height: 2.5rem;
`;

const Tag = styled.span`
  background: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  button {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    font-size: 1rem;

    &:hover {
      color: #ef4444;
    }
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task;
  users: User[];
  columnId: string;
}

export const TaskModal: FC<Props> = ({ isOpen, onClose, onSave, task, users, columnId }) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    labels: [],
    status: 'todo',
  });

  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        labels: [],
        status: columnId === 'todo' ? 'todo' : 'in-progress',
      });
    }
  }, [task, columnId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: task?.id || crypto.randomUUID(),
      createdAt: task?.createdAt || new Date().toISOString(),
    });
    onClose();
  };

  const handleAddLabel = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newLabel.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        labels: [...(prev.labels || []), newLabel.trim()],
      }));
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels?.filter((label) => label !== labelToRemove),
    }));
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{task ? 'Edit Task' : 'New Task'}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Priority</Label>
            <Select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value as Task['priority'] })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Assignee</Label>
            <Select
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Labels (Press Enter to add)</Label>
            <Input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={handleAddLabel}
              placeholder="Add a label..."
            />
            <TagInput>
              {formData.labels?.map((label) => (
                <Tag key={label}>
                  {label}
                  <button type="button" onClick={() => handleRemoveLabel(label)}>
                    ×
                  </button>
                </Tag>
              ))}
            </TagInput>
          </FormGroup>
          <Button type="submit">{task ? 'Update' : 'Create'} Task</Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};
