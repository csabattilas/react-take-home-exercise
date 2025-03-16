import React, { useState } from "react";
import { Task, TaskStatus } from "#model";
import { ConfirmationDialog } from "#ui";
import { FaCheck, FaSpinner, FaRegCircle, FaTrash } from "react-icons/fa";

interface TaskItemProps {
  task: Task;
  onChangeStatus: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
}

const STATUS_STYLES = {
  [TaskStatus.COMPLETED]: "line-through text-success-500",
  [TaskStatus.IN_PROGRESS]: "text-primary-500",
  [TaskStatus.NEW]: "text-secondary-800",
};

const STATUS_ICONS = {
  [TaskStatus.COMPLETED]: <FaCheck className="text-success-500" />,
  [TaskStatus.IN_PROGRESS]: <FaSpinner className="text-primary-500" />,
  [TaskStatus.NEW]: <FaRegCircle className="text-secondary-800" />,
};

export const TaskItem = ({ task, onChangeStatus, onDelete }: TaskItemProps) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // in angular i could push the typed value here. 
    // perhaps in react there are ways to do that too?
    const newStatus = Number(e.target.value) as TaskStatus; 
    onChangeStatus(task.id, newStatus); 
  };

  const handleStatusClick = (status: TaskStatus) => {
    onChangeStatus(task.id, status);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const statusIconsMenu = (
    <div className="flex items-center space-x-3">
      {Object.entries(STATUS_ICONS).map(([statusValue, icon]) => (
        <button
          key={statusValue}
          onClick={() => handleStatusClick(Number(statusValue) as TaskStatus)}
          className={`p-1.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 ${
            task.status === Number(statusValue)
              ? "bg-primary-100 text-primary-600 font-medium"
              : "hover:bg-secondary-50"
          }`}
          aria-label={`Mark as ${TaskStatus[Number(statusValue)]}`}    
        >
          {icon}
        </button>
      ))}
    </div>
  );

  const desktopControls = (
    <div className="hidden sm:flex gap-2 flex-shrink-0">    
      <select
        value={task.status}
        onChange={handleStatusChange}
        className="form-select text-secondary-700"
      >
        <option value={TaskStatus.NEW}>New</option>
        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
        <option value={TaskStatus.COMPLETED}>Completed</option>
      </select>

      <button
        onClick={handleDeleteClick}
        className="btn-danger btn-sm"
      >
        Delete
      </button>
    </div>
  );
  
  const mobileControls = (
    <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
      {statusIconsMenu}
      <button
        onClick={handleDeleteClick}
        className="p-1.5 text-danger-500 hover:bg-danger-50 rounded-full transition focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
        aria-label="Delete task"
      >
        <FaTrash />
      </button>
    </div>
  );

  return (
    <div className="flex items-center justify-between p-2 mb-3 rounded-lg border border-secondary-300 bg-white hover:shadow transition">
      <div className="flex-1 mr-4 overflow-hidden">
        <span 
          className={`font-medium truncate block ${STATUS_STYLES[task.status]}`}
          title={task.title}
        >
          {task.title}
        </span>
      </div>

      {desktopControls}
      {mobileControls}
      
      <ConfirmationDialog
        isOpen={showConfirmation}
        title="Confirm Deletion"
        message="Are you sure you want to delete this task?"
        highlightedText={task.title}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};