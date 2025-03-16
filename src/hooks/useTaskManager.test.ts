import { renderHook, waitFor } from '@testing-library/react';
import { useTaskManager } from './useTaskManager';
import { TaskStatus } from '#model';
import { TASKS_STORAGE_KEY, INITIAL_TASKS } from '#structure';


describe('useTaskManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('localStorage handling', () => {
    const mockLocalStorage = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value;
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      };
    })();
    
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    
    beforeEach(() => {
      mockLocalStorage.clear();
    });

    test('should load initial tasks when no saved tasks exist', () => {
      mockLocalStorage.getItem.mockReturnValueOnce(null);
      
      const { result } = renderHook(() => useTaskManager());
      
      expect(result.current.tasks).toEqual(INITIAL_TASKS);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(TASKS_STORAGE_KEY);
    });

    test('should load tasks from localStorage when they exist', () => {
      const savedTasks = [
        { id: 3, title: 'Saved Task', status: TaskStatus.COMPLETED },
      ];

      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(savedTasks));
      
      const { result } = renderHook(() => useTaskManager());
      
      expect(result.current.tasks).toEqual(savedTasks);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(TASKS_STORAGE_KEY);
    });

    test('should save tasks to localStorage when tasks change', async () => {
      const { result } = renderHook(() => useTaskManager());
      
      await waitFor(() => {
        result.current.addTask('New Test Task');
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          TASKS_STORAGE_KEY,
          JSON.stringify(result.current.tasks)
        );
      });
    });
  });

  describe('task management', () => {
    test('should add a new task with correct properties', async () => {
      const mockTimestamp = 1234567890;
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(mockTimestamp);
      
      const { result } = renderHook(() => useTaskManager());
    
      await waitFor(() => {
        result.current.addTask('New Task');
        expect(result.current.tasks).toContainEqual({
          id: mockTimestamp,
          title: 'New Task',
          status: TaskStatus.NEW,
        });
      });
      
      jest.restoreAllMocks();
    });

    test('should not add empty tasks', async () => {
      const { result } = renderHook(() => useTaskManager());
      const initialTaskCount = result.current.tasks.length;
      
      await waitFor(() => {
        result.current.addTask('');
        result.current.addTask('   ');
        expect(result.current.tasks.length).toBe(initialTaskCount);
      });
    });

    test('should delete a task by id', async () => {
      const { result } = renderHook(() => useTaskManager());
      const initialTasks = [...result.current.tasks];
      const taskToDelete = initialTasks[0];
      
      await waitFor(() => {
        result.current.deleteTask(taskToDelete.id);
        expect(result.current.tasks).not.toContainEqual(taskToDelete);
        expect(result.current.tasks.length).toBe(initialTasks.length - 1);
      });
    });

    test('should change task status', async () => {
      const { result } = renderHook(() => useTaskManager());
      const taskToUpdate = result.current.tasks[0];
      const newStatus = TaskStatus.COMPLETED;
      
      await waitFor(() => {
        result.current.changeTaskStatus(taskToUpdate.id, newStatus);
        const updatedTask = result.current.tasks.find(task => task.id === taskToUpdate.id);
        expect(updatedTask).toBeDefined();
        expect(updatedTask?.status).toBe(newStatus);
      });
    });
  });
});