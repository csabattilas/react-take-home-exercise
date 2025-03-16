import React, { FC } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from './TaskItem';
import { Task, TaskStatus } from '#model';
import { FaCheck } from 'react-icons/fa';

jest.mock('#ui', () => ({
  ConfirmationDialog: ({ isOpen, onConfirm, onCancel }: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }) => 
    isOpen ? (
      <div data-testid="mock-dialog">
        <button onClick={onConfirm} data-testid="confirm-button">Confirm</button>
        <button onClick={onCancel} data-testid="cancel-button">Cancel</button>
      </div>
    ) : null
}));

describe('TaskItem', () => {
  jest.resetModules();

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    status: TaskStatus.NEW
  };
  
  const mockOnChangeStatus = jest.fn();
  const mockOnDelete = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders task title correctly', () => {
    render(
      <TaskItem
        task={mockTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
  
  test('applies correct style based on task status', () => {
    const { rerender } = render(
      <TaskItem 
        task={mockTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    const taskTitle = screen.getByText('Test Task');
    expect(taskTitle).toHaveClass('text-secondary-800');
    
    rerender(
      <TaskItem 
        task={{ ...mockTask, status: TaskStatus.IN_PROGRESS }} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(taskTitle).toHaveClass('text-primary-500');
    
    rerender(
      <TaskItem 
        task={{ ...mockTask, status: TaskStatus.COMPLETED }} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    expect(taskTitle).toHaveClass('line-through');
    expect(taskTitle).toHaveClass('text-success-500');
  });
  
  test('calls onChangeStatus when status is changed via dropdown', async () => {
    const user = userEvent.setup();
    render(
      <TaskItem 
        task={mockTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
  
    const selectElement = screen.getByRole('combobox');
    
    await user.selectOptions(selectElement, String(TaskStatus.COMPLETED));
    
    expect(mockOnChangeStatus).toHaveBeenCalledWith(mockTask.id, TaskStatus.COMPLETED);
  });
  
  test('changes statuses correctly when clicking on status icons', async () => {
    const user = userEvent.setup();
  
    const newTask = { ...mockTask, status: TaskStatus.NEW };
    const { rerender } = render(
      <TaskItem 
        task={newTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    await user.click(screen.getByTestId('icon-new'));
    expect(mockOnChangeStatus).toHaveBeenLastCalledWith(
      mockTask.id, 
      TaskStatus.NEW
    );
    
    const inProgressTask = { ...mockTask, status: TaskStatus.IN_PROGRESS };
    rerender(
      <TaskItem 
        task={inProgressTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    await user.click(screen.getByTestId('icon-in-progress'));
    expect(mockOnChangeStatus).toHaveBeenLastCalledWith(
      mockTask.id, 
      TaskStatus.IN_PROGRESS
    );
    
    const completedTask = { ...mockTask, status: TaskStatus.COMPLETED };
    rerender(
      <TaskItem 
        task={completedTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    await user.click(screen.getByTestId('icon-completed'));
    expect(mockOnChangeStatus).toHaveBeenLastCalledWith(
      mockTask.id, 
      TaskStatus.COMPLETED
    );
  });
  
  test('shows confirmation dialog when delete button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <TaskItem 
        task={mockTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteButton = screen.getByTestId('icon-trash');
    await user.click(deleteButton);
    
    expect(screen.getByTestId('mock-dialog')).toBeInTheDocument();
  });
  
  test('shows delete icon button in mobile view', async () => {
    const user = userEvent.setup();
    render(
      <TaskItem 
        task={mockTask} 
        onChangeStatus={mockOnChangeStatus} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteIconButton = screen.getByLabelText('Delete task');
    expect(deleteIconButton).toBeInTheDocument();
    
    await user.click(deleteIconButton);
    expect(screen.getByTestId('mock-dialog')).toBeInTheDocument();
  });
});