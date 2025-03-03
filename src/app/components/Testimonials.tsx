"use client"

import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <div className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="absolute left-1/4 top-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-slideUp">
            What Users Say About
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
              TaskX
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn">
            Join thousands of professionals who have transformed their productivity with our task management system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-black/40 border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
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

// Testimonial data
const testimonials = [
  {
    quote: "TaskX has completely transformed how I manage my projects. The smart reminders ensure I never miss deadlines, and the productivity insights have helped me optimize my work schedule.",
    name: "Sarah Johnson",
    role: "Project Manager"
  },
  {
    quote: "As a team lead, the ability to track both personal and team tasks in one place has been a game-changer. The notification system keeps everyone updated without constant meetings.",
    name: "Michael Chen",
    role: "Engineering Lead"
  },
  {
    quote: "The automated task suggestions save me so much time. TaskX seems to know what I need to do before I even think about it. The progress reports are incredibly motivating too.",
    name: "Emily Rodriguez",
    role: "Marketing Director"
  },
  {
    quote: "I was struggling with prioritizing my workload until I found TaskX. The AI feedback on when I'm most productive has helped me tackle difficult tasks more efficiently.",
    name: "David Parker",
    role: "Software Developer"
  },
  {
    quote: "TaskX has been essential for our remote team. The centralized platform ensures everyone knows their responsibilities and deadlines, improving our collaboration significantly.",
    name: "Priya Sharma",
    role: "Operations Manager"
  },
  {
    quote: "The detailed progress reports have helped me identify productivity patterns I wasn't aware of. Now I schedule my most challenging work during my peak performance hours.",
    name: "James Wilson",
    role: "Financial Analyst"
  }
];

export default Testimonials;