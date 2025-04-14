
import React from 'react';
import { GitBranch, Brain, Code, Rocket } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-purple/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-brand-purple/30 bg-white/50 px-3 py-1 text-sm backdrop-blur-sm">
            <span className="mr-2 rounded-full bg-brand-purple px-2 py-0.5 text-xs font-semibold text-white">New</span>
            <span className="text-brand-blue">Weekly developer insights straight to your inbox</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-brand-blue md:text-5xl lg:text-6xl">
            <span className="block">Level up your</span>
            <span className="text-gradient">Tech Career Growth</span>
          </h1>
          
          <p className="mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
            Join Hritik Kumar's newsletter for weekly insights on tech, AI, startups, and full-stack development. 
            Learn from real-world experiences and stay ahead of industry trends.
          </p>
          
          <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center rounded-lg bg-white p-3 shadow-sm">
              <GitBranch className="mr-2 h-5 w-5 text-brand-purple" />
              <span className="text-sm font-medium">Tech Trends</span>
            </div>
            <div className="flex items-center rounded-lg bg-white p-3 shadow-sm">
              <Brain className="mr-2 h-5 w-5 text-brand-purple" />
              <span className="text-sm font-medium">AI Insights</span>
            </div>
            <div className="flex items-center rounded-lg bg-white p-3 shadow-sm">
              <Code className="mr-2 h-5 w-5 text-brand-purple" />
              <span className="text-sm font-medium">Dev Growth</span>
            </div>
            <div className="flex items-center rounded-lg bg-white p-3 shadow-sm">
              <Rocket className="mr-2 h-5 w-5 text-brand-purple" />
              <span className="text-sm font-medium">Startup Tips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
