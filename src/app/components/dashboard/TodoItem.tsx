// dashboard/TodoItem.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Todo } from '../../Types/types';

interface TodoItemProps {
  todo: Todo;
  handleToggleTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  handleToggleTodo, 
  handleDeleteTodo 
}) => {
  return (
    <li className="bg-gray-800 rounded-lg p-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo.id)}
          className="mr-3 h-5 w-5 rounded-full bg-transparent border-2 border-gray-500"
        />
        <span 
          className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}
        >
          {todo.text}
        </span>
        <button
          onClick={() => handleDeleteTodo(todo.id)}
          className="ml-2 text-gray-500 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;