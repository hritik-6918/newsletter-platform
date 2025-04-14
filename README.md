https://github.com/user-attachments/assets/01ee155a-39b5-402a-9ab8-e495a77d4e75

# Developer Growth Newsletter Platform

A modern, responsive newsletter platform that shares developer insights, tech resources, AI tools, and startup building framework from Hritik Kumar.

## Features

- **Modern, Responsive Landing Page**: Optimized for all device sizes
- **Newsletter Signup**: Email collection with interest selection
- **Automated Email Sequence**: Personalized content delivery
- **GDPR Compliant**: Clear consent, privacy policy, and data management
- **Engagement Tracking**: Analytics for email opens and clicks
- **Interest-Based Segmentation**: Content tailored to user preferences
- **Unsubscribe Options**: Easy opt-out in all communications

## Tech Stack

This project is built with:

- **Vite**: Fast, modern frontend build tool
- **TypeScript**: Type-safe JavaScript
- **React**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Supabase**: Backend-as-a-Service for data storage and edge functions
- **Resend**: API for sending transactional emails

## Getting Started

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Configuration

### Supabase Configuration

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Set up the required secrets in your Supabase project:
   - `RESEND_API_KEY`: Your Resend API key for email sending
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `SUPABASE_DB_URL`: Your Supabase database URL

### Email Templates

The project includes several email templates for different purposes:
- Welcome email
- Developer resources
- AI tools
- Startup framework
- Product case studies
- Development best practices
- Premium course offers
- Mentorship program invitations

## User Flow

1. Users visit the landing page
2. They see the value proposition and testimonials
3. They sign up via the newsletter form, selecting interests
4. The system sends an immediate welcome email
5. Based on their interests, users receive a sequence of personalized emails
6. Engagement is tracked, allowing for further personalization
7. Users can unsubscribe at any time

## Code Structure

- `/src/components`: UI components including the newsletter form
- `/src/pages`: Page components
- `/src/utils`: Utility functions including email handling
- `/src/integrations`: Integration with Supabase
- `/supabase/functions`: Edge functions for serverless operations

## Email Sequence Logic

The platform maintains a 70% value content to 30% promotional content ratio, with email sequencing based on:

1. User selected interests
2. Email engagement metrics
3. Time-based scheduling (typically 7-day intervals)

## GDPR Compliance

This project adheres to GDPR requirements:
- Explicit consent before subscribing
- Clear privacy policy
- Easy unsubscribe options
- Data deletion functionality
- Secure data storage
- No data sharing with third parties

## Contact

For questions or feedback, please contact:

Hritik Kumar  
[LinkedIn](https://www.linkedin.com/in/hritik-kumar6918/)
