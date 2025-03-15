import React, { useEffect, useState } from "react";

import TaskItem from "./TaskItem";
import { INITIAL_TASKS } from "../models/Task.structure";
import { Task, TaskStatus } from "../models/Task.model";

const TASKS_STORAGE_KEY = "tasks";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
});
  const [filter, setFilter] = useState<TaskStatus | null>(null);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === TaskStatus.COMPLETED) return task.status === TaskStatus.COMPLETED;
    if (filter === TaskStatus.NEW) return task.status === TaskStatus.NEW;
    if (filter === TaskStatus.IN_PROGRESS) return task.status === TaskStatus.IN_PROGRESS;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    if (newTask!.trim()) {
      const newTaskObj = {
        id: new Date().getTime(),
        title: newTask,
        status: TaskStatus.NEW,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };


  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleChangeStatus = (id: number, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) => 
        task.id === id ? { 
          ...task, 
          status: newStatus
        } : task
      )
    );
  };

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow">
      <form onSubmit={handleAddTask} className="mb-4 flex">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded-l py-2 px-3"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          Add
        </button>
      </form>
      <div className="flex justify-around mb-4">
        <button 
          onClick={() => setFilter(null)} 
          className="text-gray-700"
        >
          All
        </button>
        <button
          onClick={() => setFilter(TaskStatus.COMPLETED)}
          className="text-gray-700"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter(TaskStatus.IN_PROGRESS)}
          className="text-gray-700"
        >
          In Progress
        </button>
        <button 
          onClick={() => setFilter(TaskStatus.NEW)} 
          className="text-gray-700"
        >
          Pending
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onChangeStatus={handleChangeStatus}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
