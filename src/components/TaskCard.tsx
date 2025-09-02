import React, { useState } from 'react';
import { Calendar, Clock, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Task } from '../types/task';
import TaskEditModal from './TaskEditModal';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onToggleComplete, 
  onUpdateTask, 
  onDeleteTask 
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (date: Date | null): boolean => {
    if (!date || task.completed) return false;
    return date < new Date();
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-low';
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
  };

  return (
    <>
      <div className={`task-card ${task.completed ? 'completed' : ''}`}>
        <div className="task-header">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="task-checkbox"
          />
          
          <div className="task-content">
            <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            
            <div className="task-meta">
              {task.dueDate && (
                <div className={`task-due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
              
              <Badge className={`task-priority ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
              
              <Badge className="task-category">
                {task.category}
              </Badge>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <TaskEditModal
        task={task}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateTask={onUpdateTask}
      />
    </>
  );
};

export default TaskCard;