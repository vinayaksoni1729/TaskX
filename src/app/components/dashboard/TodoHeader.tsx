// dashboard/TodoHeader.tsx
import React from 'react';
import { Menu, Search, X } from 'lucide-react';

interface TodoHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="text-white"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="text-xl font-bold">Todo</h1>
      <Search size={24} />
    </div>
  );
};

export default TodoHeader;