"use client";

// dashboard/TodoInput.tsx
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
      <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
        <PlusCircle size={20} className="ml-3 text-gray-400" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a task..."
          className="w-full p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
        />
        <button 
          type="submit" 
          className="px-4 py-3 bg-gray-700 text-white"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoInput;