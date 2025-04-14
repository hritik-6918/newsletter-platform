
import React from 'react';
import Hero from '@/components/Hero';
import NewsletterForm from '@/components/NewsletterForm';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white pb-16 pt-10 md:pb-20 md:pt-16">
        <div className="container mx-auto px-4">
          <Hero />
          
          <div className="mt-10 flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <Benefits />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Email Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-blue md:text-4xl">What You'll Receive</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              A carefully crafted sequence of insights, tools, and strategies to accelerate your growth as a developer.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <div className="mb-4 border-b border-gray-200 pb-4">
              <div className="text-sm text-gray-500">From: Hritik Kumar</div>
              <div className="text-sm text-gray-500">Subject: Welcome to Hritik Kumar's newsletter!</div>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>Hey there,</p>
              
              <p>I'm thrilled to welcome you to Developer Growth newsletter! 👋</p>
              
              <p>Over the next few weeks, you'll receive my best insights on:</p>
              
              <ul className="list-inside list-disc pl-4 space-y-2">
                <li>Top developer resources that will save you hours of work</li>
                <li>AI tools I personally use to boost productivity</li>
                <li>The startup building framework I've refined over years</li>
                <li>Real product case studies with actionable lessons</li>
                <li>Development best practices from top tech companies</li>
                <li>And much more...</li>
              </ul>
              
              <p>Everything is based on my real experiences as a developer, tech leader, and startup founder.</p>
              
              <p>Stay curious and keep building great things!</p>
              
              <p>Hritik Kumar<br />Developer & Tech Founder</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-brand-blue py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Ready to Accelerate Your Developer Growth?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Join hundreds of developers who receive valuable insights every week.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="rounded-full bg-white px-8 py-3 font-medium text-brand-blue shadow-lg transition-all hover:bg-opacity-90"
          >
            Subscribe Now
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
