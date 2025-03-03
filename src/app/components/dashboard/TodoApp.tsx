"use client";
// dashboard/TodoApp.tsx
import React, { useState } from 'react';
import { Todo, ViewType } from '../../Types/types';
import Sidebar from './Sidebar';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import EmptyState from './EmptyState';

interface TodoAppProps {
    initialTodos?: Todo[];
  }
  
  const TodoApp: React.FC<TodoAppProps> = ({ initialTodos = [] }) => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [inputValue, setInputValue] = useState<string>('');
    const [activeView, setActiveView] = useState<ViewType>('inbox');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
    const handleAddTodo = (e: React.FormEvent): void => {
      e.preventDefault();
      if (inputValue.trim() === '') return;
      
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date(),
        priority: 4
      };
      
      setTodos([...todos, newTodo]);
      setInputValue('');
    };
  
    const handleToggleTodo = (id: number): void => {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    };
  
    const handleDeleteTodo = (id: number): void => {
      setTodos(todos.filter(todo => todo.id !== id));
    };
  
    // Simple helper to check if date is today
    const isToday = (date: Date): boolean => {
      const today = new Date();
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };
  
    const filteredTodos = todos.filter(todo => {
      if (activeView === 'today') return isToday(todo.createdAt);
      if (activeView === 'important') return todo.priority <= 2;
      if (activeView === 'completed') return todo.completed;
      return true; // inbox/all view
    });
  
    return (
      <div className="bg-black text-white min-h-screen flex flex-col md:flex-row">
        {/* Mobile header */}
        <TodoHeader 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
        
        {/* Sidebar */}
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        
        {/* Main content */}
        <div className="flex-grow p-4 md:p-8 overflow-auto">
          <div className="max-w-2xl mx-auto">
            {/* View title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold capitalize">
                {activeView === 'inbox' ? 'Inbox' : 
                activeView === 'today' ? 'Today' : 
                activeView === 'important' ? 'Important' : 'Completed'}
              </h2>
            </div>
            
            {/* Add task form */}
            <TodoInput 
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleAddTodo={handleAddTodo}
            />
            
            {/* Task list or empty state */}
            {filteredTodos.length > 0 ? (
              <TodoList 
                todos={filteredTodos}
                handleToggleTodo={handleToggleTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default TodoApp;