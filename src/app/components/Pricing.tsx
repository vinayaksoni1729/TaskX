"use client"

import React from 'react';
import { Check, X, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <div className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMikiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-fadeIn">
            <Zap className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-sm font-medium text-white">Simple Pricing</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-slideUp">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient ml-2">
              Plan
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn">
            Select the perfect plan for your needs. All plans include our core features with different limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 animate-fadeIn ${
                plan.popular 
                  ? "bg-gradient-to-b from-indigo-900/40 to-black/40 border-indigo-500/50 relative" 
                  : "bg-black/40 border-white/10"
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-400 mt-2 h-12">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.billing}</span>
                </div>
                
                <button 
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/25" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Get Started
                </button>
                
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
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

// Pricing plan data
const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for individuals just getting started",
    price: "0",
    billing: "month",
    popular: false,
    features: [
      { text: "Up to 30 tasks", included: true },
      { text: "Basic reminders", included: true },
      { text: "Daily progress report", included: true },
      { text: "Team collaboration", included: false },
      { text: "AI task suggestions", included: false },
      { text: "Productive time analysis", included: false },
      { text: "Priority support", included: false }
    ]
  },
  {
    name: "Pro",
    description: "Ideal for busy professionals",
    price: "12",
    billing: "month",
    popular: true,
    features: [
      { text: "Unlimited tasks", included: true },
      { text: "Advanced reminder system", included: true },
      { text: "Weekly & monthly reports", included: true },
      { text: "Team collaboration (up to 5)", included: true },
      { text: "AI task suggestions", included: true },
      { text: "Productive time analysis", included: true },
      { text: "Priority support", included: false }
    ]
  },
  {
    name: "Team",
    description: "For teams who need seamless collaboration",
    price: "39",
    billing: "month",
    popular: false,
    features: [
      { text: "Unlimited tasks", included: true },
      { text: "Advanced reminder system", included: true },
      { text: "Custom reports", included: true },
      { text: "Team collaboration (unlimited)", included: true },
      { text: "AI task suggestions", included: true },
      { text: "Productive time analysis", included: true },
      { text: "24/7 Priority support", included: true }
    ]
  }
];

export default Pricing;