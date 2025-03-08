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
    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 bg-black/40 backdrop-blur-sm border-r border-white/10`}>
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
            { view: 'important', icon: Star, label: 'Important' },
            { view: 'completed', icon: ListChecks, label: 'Completed' }
          ].map(({ view, icon: Icon, label }) => (
            <li key={view}>
              <button 
                onClick={() => setActiveView(view as ViewType)} 
                className={`w-full flex items-center p-2 rounded-lg transition-all duration-300 ${
                  activeView === view 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white' 
                    : 'hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={16} className="mr-3" />
                <span className="text-sm">{label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-4 border-t border-white/10">
          <h2 className="text-xs uppercase text-gray-500 mb-2">Projects</h2>
          <ul className="space-y-1">
            {['Personal', 'Work'].map((project) => (
              <li key={project}>
                <button className="w-full flex items-center p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300">
                  <Tag size={16} className="mr-3" />
                  <span className="text-sm">{project}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;