import React from 'react';
import { Search, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onQuickAdd }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="app-logo">
          TaskMaster
        </div>
        
        <div className="search-bar">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-500" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            onClick={onQuickAdd}
            className="quick-add-btn bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
          
          <div className="user-profile">
            <Avatar className="profile-avatar">
              <AvatarFallback className="bg-primary-600 text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;