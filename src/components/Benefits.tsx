
import React from 'react';
import { BookOpen, Code, Lightbulb, LineChart, Target, Users } from 'lucide-react';

const benefits = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Tech & AI Insights",
    description: "Deep dives into emerging technologies and AI advancements that shape the future of development."
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Full-Stack Development",
    description: "Practical code patterns, architecture decisions, and development best practices from real projects."
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Career Growth",
    description: "Strategic advice to level up your technical career, from junior developer to tech leadership."
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Learning Resources",
    description: "Curated learning paths and resources to master new skills and stay ahead of the curve."
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Startup Insights",
    description: "Behind-the-scenes lessons from building and scaling tech startups from zero to profitability."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Access",
    description: "Connect with like-minded developers and get exclusive access to events and discussions."
  }
];

const Benefits = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-blue md:text-4xl">Why Subscribe?</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Get valuable insights and practical advice delivered straight to your inbox, all designed to accelerate your growth as a developer.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 rounded-full bg-brand-purple/10 p-2 inline-block text-brand-purple">
                {benefit.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
