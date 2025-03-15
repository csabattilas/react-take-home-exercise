import React, { useState } from "react";

import { TaskForm } from "#ui";
import { TaskItem } from "#ui";
import { TaskFilter } from "#ui";
import { useTaskManager } from "#hooks";
import { TaskStatus } from "#model";

const TaskManager = () => {
  const { tasks, addTask, deleteTask, changeTaskStatus } = useTaskManager();
  // kept the filter out from task manager hooks
  // reasons: local state management, no persistency is ui specific only
  const [filter, setFilter] = useState<TaskStatus | null>(null);

  const getFilteredTasks = () => {
    if (filter === null) return tasks;
    return tasks.filter(task => task.status === filter);
  };

  const taskListItems = getFilteredTasks().map(task => (
    <TaskItem
      key={task.id}
      task={task}
      onDelete={deleteTask}
      onChangeStatus={changeTaskStatus}
    />
  ));

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
      <TaskForm onAddTask={addTask} />
      <TaskFilter activeFilter={filter} onFilterChange={setFilter} />
      <ul>
        <li>
          {taskListItems}
        </li>
      </ul>
    </div>
  );
};

export default TaskManager;
