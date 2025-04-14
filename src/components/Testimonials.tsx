
import React from 'react';

const testimonials = [
  {
    quote: "Hritik's insights on AI implementations have completely changed how I approach my projects. His newsletter is a must-read for any serious developer.",
    name: "Alex Johnson",
    role: "Senior Developer at TechCorp"
  },
  {
    quote: "The startup advice in this newsletter helped me navigate critical early decisions for my SaaS. Practical, actionable insights every week.",
    name: "Sarah Chen",
    role: "Founder & CTO, DataFlow"
  },
  {
    quote: "As someone transitioning into tech leadership, the career growth strategies have been invaluable. I've recommended this to my entire team.",
    name: "Michael Rodriguez",
    role: "Engineering Manager"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-r from-brand-purple/5 to-brand-teal/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-blue md:text-4xl">What Subscribers Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join hundreds of developers who level up their careers with weekly insights.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <div className="mb-4 text-lg italic text-gray-700">"{testimonial.quote}"</div>
              <div className="flex items-center">
                <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-brand-purple to-brand-teal"></div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
