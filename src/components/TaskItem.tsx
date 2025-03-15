import React from "react";
import { Task, TaskStatus } from "../models/Task.model";

interface TaskItemProps {
  task: Task;
  onChangeStatus: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
}

const STATUS_STYLES = {
  [TaskStatus.COMPLETED]: "line-through text-green-500",
  [TaskStatus.IN_PROGRESS]: "text-orange-500",
  [TaskStatus.NEW]: "text-black",
};

const TaskItem = ({ task, onChangeStatus, onDelete }: TaskItemProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeStatus(task.id, Number(e.target.value) as TaskStatus);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <li className="flex items-center justify-between border-b py-2">
      <span className={STATUS_STYLES[task.status]}>
        {task.title}
      </span>

      <div className="flex gap-2">    
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="border rounded px-2 py-1"
        >
          <option value={TaskStatus.NEW}>New</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.COMPLETED}>Completed</option>
        </select>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div> 
    </li>
  );
};

export default TaskItem;