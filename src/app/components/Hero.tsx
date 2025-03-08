"use client"

import React from 'react';
import { CheckCircle, Clock, Calendar, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero1: React.FC = () => {
  const router = useRouter();
  
  const handleGetStarted = () => {
    router.push('/todoapp');
  };

  return (
    <div className="relative pt-32 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-blob"></div>
        <div className="absolute top-1/2 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-28 h-28 bg-indigo-500/20 rounded-full blur-xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="w-full lg:w-7/12 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8 animate-fadeIn hover:scale-105 transition-transform">
              <CheckCircle className="w-4 h-4 text-indigo-400 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-white">Smart Task Management</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slideUp">
              Manage Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                Tasks Efficiently
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Stay organized with TaskX – the intelligent task management system that helps you prioritize, track, and complete your tasks with automated reminders and productivity insights.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-size-200 text-white font-semibold rounded-full hover:bg-pos-100 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
              >
                Get Started
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-black/50 hover:bg-white/10 transition-colors duration-300 border border-white/10">
                <Clock className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mt-1">Smart Reminders</div>
              </div>
              <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-black/50 hover:bg-white/10 transition-colors duration-300 border border-white/10">
                <BarChart2 className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mt-1">Progress Reports</div>
              </div>
              <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-black/50 hover:bg-white/10 transition-colors duration-300 border border-white/10">
                <Calendar className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mt-1">Task Automation</div>
              </div>
              <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-black/50 hover:bg-white/10 transition-colors duration-300 border border-white/10">
                <CheckCircle className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300 mt-1">Team Collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 30px) scale(1.1); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
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

export default Hero1;