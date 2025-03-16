import { taskReducer } from './reducer';
import { TaskStatus } from '#model';
import { 
  addTaskAction, 
  deleteTaskAction, 
  changeTaskStatusAction,
  TaskAction
} from './actions';
import { prototype } from 'react-modal';

describe('taskReducer', () => {
  const initialState = [
    { id: 1, title: 'Test Task 1', status: TaskStatus.NEW },
    { id: 2, title: 'Test Task 2', status: TaskStatus.IN_PROGRESS }
  ];

  test('should handle unknown action type', () => {
    const action: TaskAction = {
      type: 'UNKNOWN_ACTION' as any,
      id: 999,
      newStatus: TaskStatus.NEW
    };
    const newState = taskReducer(initialState, action);
    expect(newState).toBe(initialState);
  });

  describe('ADD_TASK action', () => {
    test('should add a new task with the correct properties', () => {
      const mockTimestamp = 1234567890;
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockTimestamp);
      
      const action = addTaskAction('New Task');
      const newState = taskReducer(initialState, action);
      
      expect(newState.length).toBe(initialState.length + 1);
      expect(newState[newState.length - 1]).toEqual({
        id: mockTimestamp,
        title: 'New Task',
        status: TaskStatus.NEW,
      });
      
      jest.restoreAllMocks(); // set back the Date
    });
  });

  describe('DELETE_TASK action', () => {
    test('should remove the task with the specified id', () => {
      const taskIdToDelete = initialState[0].id;
      const action = deleteTaskAction(taskIdToDelete);
      const newState = taskReducer(initialState, action);
      
      expect(newState.length).toBe(initialState.length - 1);
      expect(newState.find(task => task.id === taskIdToDelete)).toBeUndefined();
    });
    
    test('should return the same state if task id is not found', () => {
      const nonExistentId = 999;
      const action = deleteTaskAction(nonExistentId);
      const newState = taskReducer(initialState, action);
      
      expect(newState).toEqual(initialState);
      expect(newState.length).toBe(initialState.length);
    });
  });

  describe('CHANGE_TASK_STATUS action', () => {
    test('should update the status of the specified task', () => {
      const taskToUpdate = initialState[0];
      const newStatus = TaskStatus.COMPLETED;
      const action = changeTaskStatusAction(taskToUpdate.id, newStatus);
      const newState = taskReducer(initialState, action);
      
      const updatedTask = newState.find(task => task.id === taskToUpdate.id);
      expect(updatedTask).toBeDefined();
      expect(updatedTask?.status).toBe(newStatus);
    });
    
    test('should not change other tasks', () => {
      const taskToUpdate = initialState[0];
      const otherTask = initialState[1];
      const newStatus = TaskStatus.COMPLETED;
      const action = changeTaskStatusAction(taskToUpdate.id, newStatus);
      const newState = taskReducer(initialState, action);
      
      const unchangedTask = newState.find(task => task.id === otherTask.id);
      expect(unchangedTask).toEqual(otherTask);
    });
    
    test('should return the same state if task id is not found', () => {
      const nonExistentId = 999;
      const action = changeTaskStatusAction(nonExistentId, TaskStatus.COMPLETED);
      const newState = taskReducer(initialState, action);
      
      expect(newState).toEqual(initialState);
    });
  });
});