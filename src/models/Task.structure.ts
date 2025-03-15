import { Task, TaskStatus } from "./Task.model";

export const INITIAL_TASKS: Task[] = [
    { id: new Date().getTime(), title: "Buy groceries", status: TaskStatus.NEW },
    { id: new Date().getTime() + 1, title: "Clean the house", status: TaskStatus.NEW },
  ];