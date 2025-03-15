import { Task, TaskStatus } from "#model";

export const INITIAL_TASKS: Task[] = [
    { id: new Date().getTime(), title: "Buy groceries", status: TaskStatus.NEW },
    { id: new Date().getTime() + 1, title: "Clean the house", status: TaskStatus.NEW },
  ];

  // usually this would have a prefix to avoid key collisions
export const TASKS_STORAGE_KEY = "tasks";