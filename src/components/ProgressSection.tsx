import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Task } from '../types/task';

interface ProgressSectionProps {
  tasks: Task[];
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date();
    return task.dueDate.toDateString() === today.toDateString();
  }).length;

  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return task.dueDate < new Date();
  }).length;

  return (
    <div className="progress-section">
      <h3 className="sidebar-title">Progress Overview</h3>
      
      <div className="progress-stats">
        <div className="stat-card">
          <div className="stat-number text-primary-600">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number text-accent-600">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number text-secondary-600">{activeTasks}</div>
          <div className="stat-label">Active</div>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div className="progress-bar-label">
          <span>Overall Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="progress-bar" />
      </div>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-secondary-600">Due Today</span>
          <span className="font-medium text-primary-600">{todayTasks}</span>
        </div>
        
        {overdueTasks > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-secondary-600">Overdue</span>
            <span className="font-medium text-red-600">{overdueTasks}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressSection;