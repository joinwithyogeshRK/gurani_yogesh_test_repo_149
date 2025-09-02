import { useState, useEffect } from 'react';
import { Task } from '../types/task';

const STORAGE_KEY = 'taskmaster-tasks';

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((task: any) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    }
  } catch (error) {
    console.error('Error loading tasks from storage:', error);
  }
  return [];
};

const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
};

const getInitialTasks = (): Task[] => {
  const stored = loadTasksFromStorage();
  if (stored.length > 0) {
    return stored;
  }

  // Default sample tasks
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: generateId(),
      title: 'Complete project proposal',
      description: 'Finish the quarterly project proposal and submit to management',
      completed: false,
      priority: 'high' as const,
      category: 'work',
      dueDate: tomorrow,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Buy groceries',
      description: 'Milk, bread, eggs, and vegetables for the week',
      completed: false,
      priority: 'medium' as const,
      category: 'shopping',
      dueDate: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Exercise routine',
      description: '30 minutes of cardio and strength training',
      completed: true,
      priority: 'low' as const,
      category: 'personal',
      dueDate: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for next week team meeting',
      completed: false,
      priority: 'medium' as const,
      category: 'work',
      dueDate: nextWeek,
      createdAt: now,
      updatedAt: now,
    },
  ];
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  };
};