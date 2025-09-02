import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import TaskInput from '../components/TaskInput';
import ProgressSection from '../components/ProgressSection';
import FloatingActionButton from '../components/FloatingActionButton';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types/task';

const Home: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showTaskInput, setShowTaskInput] = useState<boolean>(false);

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'today' && isToday(task.dueDate)) ||
      (selectedCategory === 'upcoming' && isFuture(task.dueDate)) ||
      (selectedCategory === 'completed' && task.completed) ||
      task.category === selectedCategory;
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData);
    setShowTaskInput(false);
  };

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed });
    }
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isFuture = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return date > today;
  };

  return (
    <div className="main-container">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickAdd={() => setShowTaskInput(true)}
      />
      
      <div className="dashboard-layout">
        <div className="sidebar">
          <Sidebar 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            tasks={tasks}
          />
          <ProgressSection tasks={tasks} />
        </div>
        
        <div className="main-content">
          {showTaskInput && (
            <TaskInput 
              onAddTask={handleAddTask}
              onCancel={() => setShowTaskInput(false)}
            />
          )}
          
          <TaskList 
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
      
      <FloatingActionButton onClick={() => setShowTaskInput(true)} />
    </div>
  );
};

export default Home;