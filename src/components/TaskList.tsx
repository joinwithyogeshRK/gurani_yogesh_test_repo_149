import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleComplete, 
  onUpdateTask, 
  onDeleteTask 
}) => {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-8">
      {activeTasks.length > 0 && (
        <div className="task-section">
          <div className="section-header">
            <h2 className="section-title">Active Tasks</h2>
            <span className="text-sm text-secondary-600">
              {activeTasks.length} task{activeTasks.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="task-list">
            {activeTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div className="task-section">
          <div className="section-header">
            <h2 className="section-title">Completed Tasks</h2>
            <span className="text-sm text-secondary-600">
              {completedTasks.length} task{completedTasks.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="task-list">
            {completedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
      
      {tasks.length === 0 && (
        <div className="task-section">
          <div className="text-center py-12">
            <div className="text-secondary-400 mb-4">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              No tasks yet
            </h3>
            <p className="text-secondary-600">
              Create your first task to get started with your productivity journey.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;