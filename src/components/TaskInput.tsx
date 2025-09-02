import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '../types/task';

interface TaskInputProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
    };

    onAddTask(taskData);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
  };

  return (
    <div className="task-input-section slide-up">
      <div className="section-header">
        <h2 className="section-title">Add New Task</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-group">
          <label className="input-label">Task Title *</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="form-input"
            required
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add task description..."
            className="form-textarea"
            rows={3}
          />
        </div>
        
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Priority</label>
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger className="form-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="input-group">
            <label className="input-label">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="form-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="input-group">
            <label className="input-label">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-actions">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="btn-primary bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;