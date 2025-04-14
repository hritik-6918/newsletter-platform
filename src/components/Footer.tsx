
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-brand-blue">Hritik Kumar</h3>
            <p className="mt-1 text-sm text-gray-600">
              Insights for developers on tech, AI, and startup growth
            </p>
          </div>
          
          <div className="flex space-x-4 md:space-x-6">
            <a 
              href="mailto:contact@hritikkumar09grd@gmail.com" 
              aria-label="Email"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-brand-purple hover:text-white"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://x.com/curious_hritik" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-brand-purple hover:text-white"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/hritik-6918" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-brand-purple hover:text-white"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/hritik-kumar6918" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-brand-purple hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <div className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-brand-purple hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-brand-purple hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-brand-purple hover:underline">Cookie Policy</a>
            <a href="#" className="flex items-center hover:text-brand-purple hover:underline">
              <Shield className="mr-1 h-4 w-4" /> GDPR Compliance
            </a>
            <a href="#" className="font-medium text-brand-purple hover:underline">Unsubscribe</a>
          </div>
          <p className="flex items-center justify-center">
            &copy; {new Date().getFullYear()} Hritik Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
