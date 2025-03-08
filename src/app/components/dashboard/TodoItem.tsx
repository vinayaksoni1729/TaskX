import React from 'react';
import { Todo } from '../../Types/types';

interface TodoItemProps {
  todo: Todo;
  handleToggleTodo: (id: string) => void | Promise<void>; 
  handleDeleteTodo: (id: string) => void | Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  handleToggleTodo, 
  handleDeleteTodo 
}) => {
  return (
    <li className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleToggleTodo(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed 
              ? 'bg-indigo-500 border-indigo-500' 
              : 'border-gray-500 hover:border-indigo-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {todo.text}
        </span>
        
        <button
          onClick={() => handleDeleteTodo(todo.id)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;