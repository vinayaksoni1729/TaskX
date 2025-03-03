"use client"

import React from 'react';
import { CheckCircle, Clock, Calendar, BarChart2, ArrowRight } from 'lucide-react';

const DashboardPreview1: React.FC = () => {
  return (
    <div className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="absolute right-1/3 top-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute left-1/3 bottom-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-fadeIn">
              <BarChart2 className="w-4 h-4 text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-white">Powerful Dashboard</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-slideUp">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                Visualize
              </span> Your Productivity
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 animate-fadeIn">
              TaskX's intuitive dashboard gives you a complete overview of your tasks, progress, and productivity metrics at a glance. Track your performance, identify patterns, and make data-driven decisions to optimize your workflow.
            </p>
            
            <div className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              {dashboardFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-10 flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-size-200 text-white font-semibold rounded-full hover:bg-pos-100 transition-all duration-500 shadow-lg hover:shadow-indigo-500/25 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              Explore Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          <div className="w-full lg:w-1/2 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                <div className="bg-gray-900/90 rounded-xl overflow-hidden">
                  {/* Dashboard Header */}
                  <div className="bg-black/60 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-center text-white/80 text-sm">TaskX Dashboard</div>
                    <div className="w-16"></div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {mockMetrics.map((metric, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">{metric.label}</span>
                            {metric.icon}
                          </div>
                          <div className="text-2xl font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-indigo-400 mt-1">{metric.change}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Progress Chart (Mockup) */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-medium">Weekly Progress</span>
                        <div className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">This Week</div>
                      </div>
                      <div className="h-24 flex items-end justify-between gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                          const height = [40, 60, 75, 50, 85, 30, 55][i];
                          return (
                            <div key={day} className="flex flex-col items-center">
                              <div 
                                className="w-6 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-sm" 
                                style={{height: `${height}%`}}
                              ></div>
                              <span className="text-xs text-gray-400 mt-2">{day}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Task List */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-medium">Upcoming Tasks</span>
                        <div className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">Today</div>
                      </div>
                      <div className="space-y-3">
                        {mockTasks.map((task, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${task.priorityColor} mr-3`}></div>
                              <span className="text-sm text-white">{task.title}</span>
                            </div>
                            <div className="text-xs text-gray-400">{task.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        .bg-size-200 {
          background-size: 200% 100%;
        }
        .bg-pos-100 {
          background-position: 100% 0;
        }
      `}</style>
    </div>
  );
};

// Mock data for dashboard preview
const dashboardFeatures = [
  {
    icon: <BarChart2 className="w-5 h-5 text-indigo-400" />,
    title: "Visual Reports",
    description: "Track your progress with beautiful charts and visualizations that make data analysis intuitive."
  },
  {
    icon: <Calendar className="w-5 h-5 text-indigo-400" />,
    title: "Task Timeline",
    description: "View your tasks in a timeline format to better understand your schedule and workload."
  },
  {
    icon: <Clock className="w-5 h-5 text-indigo-400" />,
    title: "Productivity Insights",
    description: "Discover your most productive hours and optimize your schedule accordingly."
  }
];

const mockMetrics = [
  {
    label: "Tasks Completed",
    value: "24",
    change: "+15% vs last week",
    icon: <CheckCircle className="w-5 h-5 text-green-400" />
  },
  {
    label: "In Progress",
    value: "7",
    change: "2 due today",
    icon: <Clock className="w-5 h-5 text-yellow-400" />
  },
  {
    label: "Efficiency",
    value: "92%",
    change: "+8% vs last week",
    icon: <BarChart2 className="w-5 h-5 text-indigo-400" />
  }
];

const mockTasks = [
  {
    title: "Client Meeting",
    time: "10:30 AM",
    priorityColor: "bg-red-500"
  },
  {
    title: "Project Presentation",
    time: "1:00 PM",
    priorityColor: "bg-yellow-500"
  },
  {
    title: "Review Pull Requests",
    time: "3:30 PM",
    priorityColor: "bg-green-500"
  },
  {
    title: "Team Standup",
    time: "5:00 PM",
    priorityColor: "bg-blue-500"
  }
];

export default DashboardPreview1;