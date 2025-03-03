// dashboard/TodoList.tsx
import React from 'react';
import { Todo } from '../../Types/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  handleToggleTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  handleToggleTodo, 
  handleDeleteTodo 
}) => {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;