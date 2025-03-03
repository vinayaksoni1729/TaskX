// dashboard/Sidebar.tsx
import React from 'react';
import { Calendar, Home, ListChecks, Star, Tag, Inbox } from 'lucide-react';
import { ViewType } from '../../Types/types';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isMobileMenuOpen, 
  activeView, 
  setActiveView 
}) => {
  return (
    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block bg-gray-900 w-full md:w-64 flex-shrink-0 border-r border-gray-800`}>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Todo</h1>
        
        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => setActiveView('inbox')} 
              className={`w-full flex items-center p-2 rounded hover:bg-gray-800 ${activeView === 'inbox' ? 'bg-gray-800' : ''}`}
            >
              <Inbox size={16} className="mr-2" />
              <span>Inbox</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveView('today')} 
              className={`w-full flex items-center p-2 rounded hover:bg-gray-800 ${activeView === 'today' ? 'bg-gray-800' : ''}`}
            >
              <Calendar size={16} className="mr-2" />
              <span>Today</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveView('important')} 
              className={`w-full flex items-center p-2 rounded hover:bg-gray-800 ${activeView === 'important' ? 'bg-gray-800' : ''}`}
            >
              <Star size={16} className="mr-2" />
              <span>Important</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveView('completed')} 
              className={`w-full flex items-center p-2 rounded hover:bg-gray-800 ${activeView === 'completed' ? 'bg-gray-800' : ''}`}
            >
              <ListChecks size={16} className="mr-2" />
              <span>Completed</span>
            </button>
          </li>
        </ul>
        
        <div className="mt-8 pt-4 border-t border-gray-800">
          <h2 className="text-sm uppercase text-gray-500 mb-2">Projects</h2>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center p-2 rounded hover:bg-gray-800">
                <Tag size={16} className="mr-2" />
                <span>Personal</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center p-2 rounded hover:bg-gray-800">
                <Tag size={16} className="mr-2" />
                <span>Work</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;