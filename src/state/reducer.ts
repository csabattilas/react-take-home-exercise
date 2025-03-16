import { Task, TaskStatus } from "#model";
import { TaskAction, TaskActionTypes } from "#state";

export const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK:
      return [
        ...state,
        {
          id: new Date().getTime(), // need unique ids
          title: action.title,
          status: TaskStatus.NEW,
        },
      ];

    case TaskActionTypes.DELETE_TASK:
      return state.filter((task) => task.id !== action.id);

    case TaskActionTypes.CHANGE_TASK_STATUS:
      return state.map((task) =>
        task.id === action.id ? { ...task, status: action.newStatus } : task
      );

    default:
      return state;
  }
};
