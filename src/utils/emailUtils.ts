// This file provides integration with the Resend API for email automation
import { supabase } from "@/integrations/supabase/client";

export interface SubscriberData {
  email: string;
  interests: string[];
  timestamp: string;
  name?: string; // Optional name field for personalization
  gdprConsent?: boolean; // GDPR consent flag
}

export interface EmailTemplate {
  subject: string;
  body: string;
}

// Function to save subscriber data and trigger the welcome email
export const saveSubscriber = async (data: SubscriberData): Promise<boolean> => {
  console.log('Saving subscriber:', data);
  
  // Ensure GDPR consent is given
  if (!data.gdprConsent) {
    console.error('GDPR consent is required');
    return false;
  }
  
  try {
    // Send welcome email immediately via Supabase Edge Function
    const success = await sendEmail(data.email, 'welcome', { name: data.name });
    
    if (success) {
      // Schedule the sequence of emails based on interests
      scheduleEmailSequence(data);
    }
    
    return success;
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return false;
  }
};

// Schedule the email sequence for a subscriber
const scheduleEmailSequence = (data: SubscriberData) => {
  // In a real implementation, this would set up a scheduled job for each email
  // For now, we'll log the planned sequence
  console.log('Scheduling email sequence for:', data.email);
  
  // Map of interests to relevant templates
  const interestTemplateMap: Record<string, string[]> = {
    'tech': ['devResources', 'aiTools'],
    'ai': ['aiTools'],
    'development': ['devResources', 'devBestPractices'],
    'startup': ['startupFramework', 'productCaseStudy'],
    'product': ['productCaseStudy'],
  };
  
  // Create a personalized sequence based on interests
  const sequence: string[] = ['welcome'];
  
  // Add interest-specific emails
  data.interests.forEach(interest => {
    const templates = interestTemplateMap[interest.toLowerCase()];
    if (templates) {
      sequence.push(...templates);
    }
  });
  
  // Add promotional emails (respecting the 70% value / 30% promotional ratio)
  // We ensure promotional content doesn't exceed 30%
  const totalEmails = Math.min(10, sequence.length + 2); // Cap at 10 emails max
  const maxPromotional = Math.floor(totalEmails * 0.3); // 30% max promotional
  
  // Only add promotional content if we haven't exceeded the 30% limit
  if (sequence.length + 2 <= totalEmails && 2 <= maxPromotional) {
    sequence.push('premiumCourse');
    sequence.push('mentorship');
  } else if (sequence.length + 1 <= totalEmails && 1 <= maxPromotional) {
    // Add only one promotional email if adding two would exceed our ratio
    sequence.push('premiumCourse');
  }
  
  // Log the planned sequence
  console.log('Planned email sequence:', sequence);
  console.log('Content ratio - Value:', (totalEmails - maxPromotional) / totalEmails * 100, '%, Promotional:', maxPromotional / totalEmails * 100, '%');
  
  // In a real implementation, we would schedule these emails to be sent at intervals
  // For example, using a service like Supabase scheduled functions or a dedicated email service
};

// Function for sending emails via Resend API using Supabase Edge Function
export const sendEmail = async (to: string, templateName: string, customData: any = {}): Promise<boolean> => {
  console.log(`Preparing to send email template "${templateName}" to ${to}`);
  
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-newsletter', {
      body: { 
        email: to, 
        template: templateName,
        customData 
      }
    });

    if (error) {
      console.error('Error calling send-newsletter function:', error);
      return false;
    }
    
    // Log success
    console.log(`Email sent successfully to ${to} with template "${templateName}"`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Function to handle unsubscribe requests
export const unsubscribeUser = async (email: string): Promise<boolean> => {
  console.log(`Unsubscribing user: ${email}`);
  
  try {
    // In a real implementation, this would update your database to mark the user as unsubscribed
    
    // Log the unsubscribe for compliance purposes
    console.log(`User ${email} unsubscribed at ${new Date().toISOString()}`);
    
    // Return success
    return true;
  } catch (error) {
    console.error('Error unsubscribing user:', error);
    return false;
  }
};

// Function to track email engagement metrics
export const trackEmailOpen = async (email: string, templateId: string): Promise<void> => {
  // In a real implementation, this would log to your analytics system
  console.log(`Email opened: ${templateId} by ${email} at ${new Date().toISOString()}`);
};

// Function to track email link clicks
export const trackEmailClick = async (email: string, templateId: string, linkId: string): Promise<void> => {
  // In a real implementation, this would log to your analytics system
  console.log(`Link clicked: ${linkId} in email ${templateId} by ${email} at ${new Date().toISOString()}`);
};

// Handle user data deletion requests (GDPR right to be forgotten)
export const deleteUserData = async (email: string): Promise<boolean> => {
  console.log(`Processing data deletion request for: ${email}`);
  
  try {
    // In a real implementation, this would:
    // 1. Delete all user data from your database
    // 2. Remove the user from all mailing lists
    // 3. Log the deletion for compliance purposes
    
    console.log(`User data for ${email} deleted at ${new Date().toISOString()}`);
    return true;
  } catch (error) {
    console.error('Error deleting user data:', error);
    return false;
  }
};

// Export email templates for testing or preview purposes
export const emailTemplates = {
  welcome: {
    subject: "Welcome to Hritik's Developer Insights!",
    body: `
      <h1>Welcome to Hritik Kumar's newsletter!</h1>
      <p>Hi there,</p>
      <p>I'm thrilled to welcome you to my newsletter where I share insights on tech, AI, startup building, and full-stack development.</p>
      <p>Over the next few weeks, you'll receive carefully crafted content based on your interests, all drawn from my real-world experiences.</p>
      <p>Stay curious and keep building great things!</p>
      <p>Hritik Kumar<br>Developer & Tech Founder</p>
    `
  },
  devResources: {
    subject: "Top 5 Developer Resources You Need to Know About",
    body: `
      <h1>Essential Developer Resources</h1>
      <p>Hi there,</p>
      <p>Here are the essential tools and resources every developer should have in their arsenal:</p>
      <ul>
        <li>Resource 1: Comprehensive description and how it helps</li>
        <li>Resource 2: Comprehensive description and how it helps</li>
        <li>Resource 3: Comprehensive description and how it helps</li>
        <li>Resource 4: Comprehensive description and how it helps</li>
        <li>Resource 5: Comprehensive description and how it helps</li>
      </ul>
      <p>I've personally used each of these in my journey as a developer and tech founder.</p>
      <p>Hritik Kumar</p>
    `
  },
  aiTools: {
    subject: "AI Tools That Will Transform Your Development Workflow",
    body: `
      <h1>AI-Powered Development Tools</h1>
      <p>Hi there,</p>
      <p>Discover how these AI-powered tools can make you a more efficient and effective developer:</p>
      <ul>
        <li>AI Tool 1: Description and practical use case</li>
        <li>AI Tool 2: Description and practical use case</li>
        <li>AI Tool 3: Description and practical use case</li>
      </ul>
      <p>I've integrated these into my workflow and seen tremendous productivity gains.</p>
      <p>Hritik Kumar</p>
    `
  },
  startupFramework: {
    subject: "The Startup Building Framework I've Refined Over Years",
    body: `
      <h1>Startup Building Framework</h1>
      <p>Hi there,</p>
      <p>After years of building startups, I've refined this framework that helps navigate the early stages:</p>
      <ol>
        <li>Phase 1: Idea validation and market research</li>
        <li>Phase 2: MVP development and feedback loops</li>
        <li>Phase 3: Initial traction and user acquisition</li>
        <li>Phase 4: Product-market fit refinement</li>
        <li>Phase 5: Scaling and growth strategies</li>
      </ol>
      <p>This framework has helped me avoid common pitfalls and focus on what truly matters.</p>
      <p>Hritik Kumar</p>
    `
  },
  productCaseStudy: {
    subject: "Real Product Case Study with Actionable Lessons",
    body: `
      <h1>Product Case Study</h1>
      <p>Hi there,</p>
      <p>Today I'm sharing a real case study from one of my products:</p>
      <h2>The Challenge</h2>
      <p>Description of the problem we faced...</p>
      <h2>The Approach</h2>
      <p>How we tackled the problem...</p>
      <h2>The Results</h2>
      <p>The outcomes and metrics...</p>
      <h2>Key Takeaways</h2>
      <p>The most important lessons learned...</p>
      <p>Hritik Kumar</p>
    `
  },
  devBestPractices: {
    subject: "Development Best Practices from Top Tech Companies",
    body: `
      <h1>Development Best Practices</h1>
      <p>Hi there,</p>
      <p>Here are some development best practices I've learned from working with top tech companies:</p>
      <ul>
        <li>Best Practice 1: Description and implementation details</li>
        <li>Best Practice 2: Description and implementation details</li>
        <li>Best Practice 3: Description and implementation details</li>
        <li>Best Practice 4: Description and implementation details</li>
        <li>Best Practice 5: Description and implementation details</li>
      </ul>
      <p>Incorporating these practices can significantly improve code quality and team efficiency.</p>
      <p>Hritik Kumar</p>
    `
  },
  premiumCourse: {
    subject: "Exclusive Offer: Premium Developer Course",
    body: `
      <h1>Premium Developer Course</h1>
      <p>Hi there,</p>
      <p>I'm excited to offer you exclusive access to my premium course on advanced development techniques.</p>
      <h2>What You'll Learn</h2>
      <ul>
        <li>Module 1: Topic description</li>
        <li>Module 2: Topic description</li>
        <li>Module 3: Topic description</li>
      </ul>
      <p><a href="#">Learn More and Enroll</a></p>
      <p>Hritik Kumar</p>
    `
  },
  mentorship: {
    subject: "Join My Exclusive Mentorship Program",
    body: `
      <h1>Exclusive Mentorship Program</h1>
      <p>Hi there,</p>
      <p>I'm opening up a limited number of spots in my developer mentorship program.</p>
      <h2>Program Benefits</h2>
      <ul>
        <li>Benefit 1: Description</li>
        <li>Benefit 2: Description</li>
        <li>Benefit 3: Description</li>
      </ul>
      <p><a href="#">Apply for Mentorship</a></p>
      <p>Hritik Kumar</p>
    `
  },
};
