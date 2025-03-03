"use client"

import React from 'react';
import { CheckCircle, Clock, BarChart2, Calendar, Bell, Users, Brain, Zap } from 'lucide-react';

const Features1: React.FC = () => {
  return (
    <div className="relative py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-fadeIn">
            <Zap className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-white">Why Choose TaskX</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-slideUp">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
              Powerful Features
            </span> For Productivity
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn">
            TaskX comes packed with intelligent features designed to enhance your productivity and streamline your workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="backdrop-blur-sm bg-black/40 border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
          background-size: 200% 200%;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Feature data
const features = [
  {
    icon: <Bell className="w-6 h-6 text-white" />,
    title: "Smart Reminders",
    description: "Never miss important deadlines with our intelligent reminder system that sends notifications based on task priority and deadlines."
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-white" />,
    title: "Progress Reports",
    description: "Track your productivity with detailed visual reports showing completed tasks, productivity trends, and performance metrics."
  },
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    title: "Task Automation",
    description: "Save time with automatic task creation based on your history and patterns, reducing manual entry and repetitive work."
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Team Collaboration",
    description: "Manage both personal and team tasks in one centralized platform with real-time updates and notifications."
  },
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    title: "AI-Powered Insights",
    description: "Receive feedback on optimal times for completing difficult tasks based on your productivity patterns."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    title: "Smart Task Assignment",
    description: "Optimize your workflow with intelligent task prioritization and conflict detection for maximum efficiency."
  }
];

export default Features1;