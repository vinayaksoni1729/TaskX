import React from 'react';
import { Todo } from '../../Types/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  handleToggleTodo: (id: string) => void | Promise<void>;
  handleDeleteTodo: (id: string) => void | Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  handleToggleTodo, 
  handleDeleteTodo 
}) => {
  return (
    <ul className="space-y-3">
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