
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle2, Loader2, Shield } from 'lucide-react';
import { saveSubscriber } from '@/utils/emailUtils';

const interestOptions = [
  { id: 'tech', label: 'Tech Trends' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'development', label: 'Development' },
  { id: 'startup', label: 'Startup' },
  { id: 'product', label: 'Product Building' },
];

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);

  const handleInterestChange = (id: string) => {
    setInterests(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate interests (at least one must be selected)
    if (interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }

    // Validate GDPR consent
    if (!gdprConsent) {
      setError('You must consent to our Privacy Policy to continue');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create subscriber data object
      const subscriberData = {
        email,
        name,
        interests,
        timestamp: new Date().toISOString(),
        gdprConsent: true
      };
      
      // Save subscriber and trigger welcome email
      const success = await saveSubscriber(subscriberData);
      
      if (success) {
        // Success!
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "You've been subscribed to the newsletter. Check your inbox for a welcome email!",
        });
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Something went wrong. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-xl bg-white p-4 shadow-lg md:p-8">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">You're In!</h3>
          <p className="text-gray-600">
            Thanks for subscribing! Check your inbox for a welcome email with more details.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            You can unsubscribe at any time by clicking the unsubscribe link at the bottom of any email.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900">Join the Newsletter</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name (optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${error && !email ? 'border-red-500' : ''}`}
              />
            </div>
            
            <div className="space-y-2">
              <Label>What are you interested in?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {interestOptions.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.id} 
                      checked={interests.includes(option.id)}
                      onCheckedChange={() => handleInterestChange(option.id)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="gdpr-consent" 
                checked={gdprConsent}
                onCheckedChange={(checked) => setGdprConsent(checked === true)}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="gdpr-consent" className="cursor-pointer text-sm">
                  I consent to receive newsletter emails and understand my data will be processed as described in the Privacy Policy
                </Label>
                <p className="text-xs text-gray-500 flex items-center">
                  <Shield className="h-3 w-3 mr-1" /> 
                  Your data is secured and will never be shared with third parties
                </p>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-brand-purple to-brand-teal font-medium text-white transition-all hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe to Newsletter"
            )}
          </Button>
          
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
            <p>
              You can unsubscribe at any time with a single click.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
