import React from 'react';
import { PlusCircle } from 'lucide-react';

interface TodoInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleAddTodo: (e: React.FormEvent) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ 
  inputValue, 
  setInputValue, 
  handleAddTodo 
}) => {
  return (
    <form onSubmit={handleAddTodo} className="mb-8">
      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 focus-within:border-indigo-500 transition-all duration-300">
        <div className="p-3 bg-white/5">
          <PlusCircle size={20} className="text-indigo-400" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoInput;