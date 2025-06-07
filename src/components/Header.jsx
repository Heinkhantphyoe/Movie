import React from 'react';
import { Film, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-12 w-full max-w-2xl relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-sm"></div>
      
      {/* Main header content */}
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-8 shadow-xl">
        {/* Decorative sparkles */}
        <div className="absolute top-3 right-3 opacity-20">
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="absolute bottom-3 left-3 opacity-15">
          <Sparkles className="w-4 h-4 text-blue-400" />
        </div>
        
        {/* Title with icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
            <Film className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">
            Movie Explorer
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-center text-slate-300 text-base font-medium leading-relaxed">
          Find your favorite movies instantly
        </p>
        
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
      </div>
    </header>
  );
}