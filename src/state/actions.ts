import { TaskStatus } from "../model/Task.model";

export enum TaskActionTypes {
  ADD_TASK = "ADD_TASK",
  DELETE_TASK = "DELETE_TASK",
  CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
}

export interface AddTaskAction {
  type: TaskActionTypes.ADD_TASK;
  title: string;
}

export interface DeleteTaskAction {
  type: TaskActionTypes.DELETE_TASK;
  id: number;
}

export interface ChangeTaskStatusAction {
  type: TaskActionTypes.CHANGE_TASK_STATUS;
  id: number;
  newStatus: TaskStatus;
}

export type TaskAction = 
  | AddTaskAction 
  | DeleteTaskAction 
  | ChangeTaskStatusAction;

export const addTaskAction = (title: string): AddTaskAction => ({
  type: TaskActionTypes.ADD_TASK,
  title
});

export const deleteTaskAction = (id: number): DeleteTaskAction => ({
  type: TaskActionTypes.DELETE_TASK,
  id
});

export const changeTaskStatusAction = (id: number, newStatus: TaskStatus): ChangeTaskStatusAction => ({
  type: TaskActionTypes.CHANGE_TASK_STATUS,
  id,
  newStatus
});
