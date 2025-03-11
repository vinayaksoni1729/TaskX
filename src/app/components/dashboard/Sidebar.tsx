import React from 'react';
import { Calendar, ListChecks, Star, Tag, Inbox, Clock } from 'lucide-react';
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
    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 bg-black/40 backdrop-blur-sm border-r border-white/10 transition-all duration-300`}>
      <div className="p-4">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            TaskX
          </h1>
        </div>

        <ul className="space-y-1">
          {[
            { view: 'inbox', icon: Inbox, label: 'Inbox' },
            { view: 'today', icon: Calendar, label: 'Today' },
            { view: 'upcoming', icon: Clock, label: 'Upcoming' },
            { view: 'important', icon: Star, label: 'Important' },
            { view: 'completed', icon: ListChecks, label: 'Completed' }
          ].map(({ view, icon: Icon, label }) => (
            <li key={view}>
              <button 
                onClick={() => setActiveView(view as ViewType)} 
                className={`w-full flex items-center p-2 rounded-lg transition-all duration-300 ${
                  activeView === view 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border-l-2 border-indigo-500' 
                    : 'hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={16} className={`mr-3 ${activeView === view ? 'text-indigo-400' : ''}`} />
                <span className="text-sm">{label}</span>
                {activeView === view && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-4 border-t border-white/10">
          <h2 className="text-xs uppercase text-gray-500 mb-2 px-2">Projects</h2>
          <ul className="space-y-1">
            {[
              { view: 'project-personal', label: 'Personal', color: 'bg-indigo-400' },
              { view: 'project-work', label: 'Work', color: 'bg-purple-400' }
            ].map(({ view, label, color }) => (
              <li key={view}>
                <button 
                  onClick={() => setActiveView(view as ViewType)}
                  className={`w-full flex items-center p-2 rounded-lg transition-all duration-300 ${
                    activeView === view 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border-l-2 border-indigo-500' 
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${color} mr-1.5`}></div>
                  <Tag size={14} className={`mr-2 ${activeView === view ? 'text-indigo-400' : ''}`} />
                  <span className="text-sm">{label}</span>
                  {activeView === view && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/10">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg p-4">
            <h3 className="text-sm font-medium text-indigo-300 mb-2">Pro Tips</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Use priority levels to organize your tasks and meet deadlines more effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;