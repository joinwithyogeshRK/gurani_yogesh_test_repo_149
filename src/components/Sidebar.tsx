import React from 'react';
import { Calendar, Clock, CheckCircle, Folder, Home, Star, Archive } from 'lucide-react';
import { Task } from '../types/task';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  tasks: Task[];
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onCategoryChange, tasks }) => {
  const getTaskCount = (category: string): number => {
    switch (category) {
      case 'all':
        return tasks.length;
      case 'today':
        return tasks.filter(task => isToday(task.dueDate)).length;
      case 'upcoming':
        return tasks.filter(task => isFuture(task.dueDate)).length;
      case 'completed':
        return tasks.filter(task => task.completed).length;
      default:
        return tasks.filter(task => task.category === category).length;
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

  const quickViews = [
    { id: 'all', label: 'All Tasks', icon: Home, count: getTaskCount('all') },
    { id: 'today', label: 'Today', icon: Calendar, count: getTaskCount('today') },
    { id: 'upcoming', label: 'Upcoming', icon: Clock, count: getTaskCount('upcoming') },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: getTaskCount('completed') },
  ];

  const categories = [
    { id: 'work', label: 'Work', icon: Folder, count: getTaskCount('work') },
    { id: 'personal', label: 'Personal', icon: Star, count: getTaskCount('personal') },
    { id: 'shopping', label: 'Shopping', icon: Archive, count: getTaskCount('shopping') },
  ];

  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const Icon = item.icon;
    return (
      <div
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={() => onCategoryChange(item.id)}
      >
        <div className="nav-label">
          <Icon className="h-5 w-5" />
          <span>{item.label}</span>
        </div>
        <span className={`nav-count ${isActive ? 'active' : ''}`}>
          {item.count}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Quick Views</h3>
        <div className="space-y-1">
          {quickViews.map(item => (
            <NavItem 
              key={item.id} 
              item={item} 
              isActive={selectedCategory === item.id} 
            />
          ))}
        </div>
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-title">Categories</h3>
        <div className="space-y-1">
          {categories.map(item => (
            <NavItem 
              key={item.id} 
              item={item} 
              isActive={selectedCategory === item.id} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;