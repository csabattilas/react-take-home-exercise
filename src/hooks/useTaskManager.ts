import { useEffect, useReducer } from "react";
import { INITIAL_TASKS, TASKS_STORAGE_KEY } from "#structure";
import { Task, TaskStatus } from "#model";
import { taskReducer } from "#state";
import { addTaskAction, deleteTaskAction, changeTaskStatusAction } from "#state";

const loadTasksFromStorage = (): Task[] => {
  const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
};

export const useTaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, loadTasksFromStorage());

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    dispatch(addTaskAction(title));
  };

  const deleteTask = (id: number) => {
    dispatch(deleteTaskAction(id));
  };

  const changeTaskStatus = (id: number, status: TaskStatus) => {
    dispatch(changeTaskStatusAction(id, status));
  };

  return {
    tasks,
    addTask,
    deleteTask,
    changeTaskStatus
  };
};