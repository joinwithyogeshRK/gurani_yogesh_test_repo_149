import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fab bg-primary-600 hover:bg-primary-700 md:hidden"
      size="lg"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};

export default FloatingActionButton;