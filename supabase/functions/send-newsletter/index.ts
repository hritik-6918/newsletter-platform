
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, template, customData } = await req.json();
    
    if (!email || !template) {
      return new Response(
        JSON.stringify({ error: "Email and template are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending email template "${template}" to ${email}`);
    
    // Get template content based on template name
    const templateData = getEmailTemplate(template, customData);
    
    if (!templateData) {
      return new Response(
        JSON.stringify({ error: "Invalid template" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Add unsubscribe link and GDPR footer to all emails
    const unsubscribeUrl = `https://yourdomain.com/unsubscribe?email=${encodeURIComponent(email)}`;
    const emailWithFooter = addEmailFooter(templateData.body, unsubscribeUrl);
    
    const emailResponse = await resend.emails.send({
      from: "Developer Newsletter <newsletter@resend.dev>",
      to: [email],
      subject: templateData.subject,
      html: emailWithFooter,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
      }
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

// Add standardized footer with unsubscribe link to all emails
function addEmailFooter(emailBody: string, unsubscribeUrl: string): string {
  return `
    ${emailBody}
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
    <div style="font-size: 12px; color: #6b7280; text-align: center; font-family: sans-serif;">
      <p>
        You're receiving this email because you subscribed to Hritik Kumar's Developer Newsletter.
      </p>
      <p>
        We respect your privacy. View our <a href="https://yourdomain.com/privacy" style="color: #6e59a5;">Privacy Policy</a>.
      </p>
      <p>
        <a href="${unsubscribeUrl}" style="color: #6e59a5;">Unsubscribe</a> | <a href="https://yourdomain.com/preferences" style="color: #6e59a5;">Update your preferences</a>
      </p>
      <p>
        Hritik Kumar &copy; ${new Date().getFullYear()}, All rights reserved.<br />
        Our mailing address: 123 Developer St, Tech City, TC 12345
      </p>
    </div>
  `;
}

// Function to get email template content
function getEmailTemplate(templateName: string, customData: any = {}) {
  const templates: Record<string, any> = {
    welcome: {
      subject: "Welcome to Hritik's Developer Insights!",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">Welcome to Hritik Kumar's newsletter!</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">I'm thrilled to welcome you to my newsletter where I share insights on tech, AI, startup building, and full-stack development.</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Over the next few weeks, you'll receive carefully crafted content based on your interests, all drawn from my real-world experiences.</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Stay curious and keep building great things!</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar<br>Developer & Tech Founder</p>
      `
    },
    devResources: {
      subject: "Top 5 Developer Resources You Need to Know About",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">Essential Developer Resources</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Here are the essential tools and resources every developer should have in their arsenal:</p>
        <ul style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">
          <li style="margin-bottom: 10px;">Resource 1: Comprehensive description and how it helps</li>
          <li style="margin-bottom: 10px;">Resource 2: Comprehensive description and how it helps</li>
          <li style="margin-bottom: 10px;">Resource 3: Comprehensive description and how it helps</li>
          <li style="margin-bottom: 10px;">Resource 4: Comprehensive description and how it helps</li>
          <li style="margin-bottom: 10px;">Resource 5: Comprehensive description and how it helps</li>
        </ul>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">I've personally used each of these in my journey as a developer and tech founder.</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar</p>
      `
    },
    aiTools: {
      subject: "AI Tools That Will Transform Your Development Workflow",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">AI-Powered Development Tools</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Discover how these AI-powered tools can make you a more efficient and effective developer:</p>
        <ul style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">
          <li style="margin-bottom: 10px;">AI Tool 1: Description and practical use case</li>
          <li style="margin-bottom: 10px;">AI Tool 2: Description and practical use case</li>
          <li style="margin-bottom: 10px;">AI Tool 3: Description and practical use case</li>
        </ul>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">I've integrated these into my workflow and seen tremendous productivity gains.</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar</p>
      `
    },
    startupFramework: {
      subject: "The Startup Building Framework I've Refined Over Years",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">Startup Building Framework</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">After years of building startups, I've refined this framework that helps navigate the early stages:</p>
        <ol style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">
          <li style="margin-bottom: 10px;">Phase 1: Idea validation and market research</li>
          <li style="margin-bottom: 10px;">Phase 2: MVP development and feedback loops</li>
          <li style="margin-bottom: 10px;">Phase 3: Initial traction and user acquisition</li>
          <li style="margin-bottom: 10px;">Phase 4: Product-market fit refinement</li>
          <li style="margin-bottom: 10px;">Phase 5: Scaling and growth strategies</li>
        </ol>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">This framework has helped me avoid common pitfalls and focus on what truly matters.</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar</p>
      `
    },
    productCaseStudy: {
      subject: "Real Product Case Study with Actionable Lessons",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">Product Case Study</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Today I'm sharing a real case study from one of my products:</p>
        <h2 style="color: #2D3B55; font-family: sans-serif; font-size: 20px; margin: 20px 0 10px;">The Challenge</h2>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Description of the problem we faced...</p>
        <h2 style="color: #2D3B55; font-family: sans-serif; font-size: 20px; margin: 20px 0 10px;">The Approach</h2>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">How we tackled the problem...</p>
        <h2 style="color: #2D3B55; font-family: sans-serif; font-size: 20px; margin: 20px 0 10px;">The Results</h2>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">The outcomes and metrics...</p>
        <h2 style="color: #2D3B55; font-family: sans-serif; font-size: 20px; margin: 20px 0 10px;">Key Takeaways</h2>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">The most important lessons learned...</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar</p>
      `
    },
    devBestPractices: {
      subject: "Development Best Practices from Top Tech Companies",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">Development Best Practices</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Here are some development best practices I've learned from working with top tech companies:</p>
        <ul style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">
          <li style="margin-bottom: 10px;">Best Practice 1: Description and implementation details</li>
          <li style="margin-bottom: 10px;">Best Practice 2: Description and implementation details</li>
          <li style="margin-bottom: 10px;">Best Practice 3: Description and implementation details</li>
          <li style="margin-bottom: 10px;">Best Practice 4: Description and implementation details</li>
          <li style="margin-bottom: 10px;">Best Practice 5: Description and implementation details</li>
        </ul>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Incorporating these practices can significantly improve code quality and team efficiency.</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar</p>
      `
    },
    premiumCourse: {
      subject: "Exclusive Offer: Premium Developer Course",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">Premium Developer Course</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">I'm excited to offer you exclusive access to my premium course on advanced development techniques.</p>
        <h2 style="color: #2D3B55; font-family: sans-serif; font-size: 20px; margin: 20px 0 10px;">What You'll Learn</h2>
        <ul style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">
          <li style="margin-bottom: 10px;">Module 1: Topic description</li>
          <li style="margin-bottom: 10px;">Module 2: Topic description</li>
          <li style="margin-bottom: 10px;">Module 3: Topic description</li>
        </ul>
        <p style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: linear-gradient(to right, #6E59A5, #0EA5E9); color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-family: sans-serif; font-weight: bold;">Learn More and Enroll</a>
        </p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar</p>
      `
    },
    mentorship: {
      subject: "Join My Exclusive Mentorship Program",
      body: `
        <h1 style="color: #2D3B55; font-family: sans-serif; font-size: 24px; margin-bottom: 20px;">Exclusive Mentorship Program</h1>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hi ${customData.name || 'there'},</p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">I'm opening up a limited number of spots in my developer mentorship program.</p>
        <h2 style="color: #2D3B55; font-family: sans-serif; font-size: 20px; margin: 20px 0 10px;">Program Benefits</h2>
        <ul style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">
          <li style="margin-bottom: 10px;">Benefit 1: Description</li>
          <li style="margin-bottom: 10px;">Benefit 2: Description</li>
          <li style="margin-bottom: 10px;">Benefit 3: Description</li>
        </ul>
        <p style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: linear-gradient(to right, #6E59A5, #0EA5E9); color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-family: sans-serif; font-weight: bold;">Apply for Mentorship</a>
        </p>
        <p style="font-family: sans-serif; font-size: 16px; line-height: 1.5; color: #4B5563;">Hritik Kumar</p>
      `
    }
  };
  
  return templates[templateName] || null;
}
