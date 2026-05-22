# APPI Website - African Political Parties Initiative

## Overview

This is the official website for the African Political Parties Initiative (APPI), a continental platform committed to repositioning political parties as central institutions for governance, policy development, and national transformation.

## Current Status

The website is currently in development mode with a "Coming Soon" page as the main landing page. The full website is accessible during development but will be hidden in production until launch.

## Website Structure

### Main Navigation (6 sections)

1. **ABOUT** - Organization information and strategic framework
   - Who We Are (Vision, Mission, Principles)
   - Strategic Objectives (Pillars and Framework)
   - Leadership & Governance
   - Implementation Framework
   - Declarations & Communiqués

2. **OUR PLATFORMS** - Core programmatic platforms
   - African Political Parties Summit (APPS)
   - Political Academy for Transformative Leadership
   - Thematic Working Groups
   - Country-Level Reform Dialogues
   - Inclusive Leadership Platforms
   - Regional Learning Hubs
   - Conflict Mediation Unit (CMDAU)

3. **SUMMIT** - Information about the annual summit
   - About APPS
   - Next Summit (APPS 2025 - Accra, Ghana)
   - Registration
   - Media Toolkit

4. **ENGAGEMENT** - How to get involved
   - For Political Parties
   - Youth & Women
   - CTPE-AfCFTA
   - Join as Partner

5. **INSIGHTS** - Knowledge and research
   - Publications
   - Thought Leadership
   - Events Calendar
   - Press Releases
   - Media Coverage

6. **CONTACT** - Contact information and resources
   - Contact Secretariat
   - Social Media
   - Member Login

## Accessing the Website

### Development Mode
- All pages are accessible during development
- Navigate to any route to see the full website
- The coming soon page is at the root (`/`)

### Production Mode
- Only the coming soon page is accessible
- All other routes redirect to the coming soon page
- Full website will be accessible after launch

## Key Features

- **Multilingual Support**: English, French, Portuguese, Spanish, Arabic, Amharic, Swahili
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Built with Next.js, Tailwind CSS, and shadcn/ui components
- **Accessibility**: WCAG compliant design
- **SEO Optimized**: Proper meta tags and structured data

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel (configured)

## Development

### Running Locally

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Create a `.env.local` file with:

```env
NODE_ENV=development
```

## Content Management

The website content is structured according to the detailed content guide provided. All text content is extracted from the official APPI documentation and can be updated in the respective page components.

## Deployment

The website is configured for deployment on Vercel with:
- Automatic builds from the main branch
- Environment-specific behavior (development vs production)
- Optimized for performance and SEO

## Contact

For questions about the website or APPI, contact:
- Email: appi@africagovernancecentre.org
- Website: [Coming Soon Page](/)

## License

This project is proprietary to the African Political Parties Initiative.
