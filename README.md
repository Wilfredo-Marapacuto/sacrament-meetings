# Sacrament Meeting Planner

Sacrament Meeting Planner is a full-stack web application designed to help bishoprics and branch leaders organize and review sacrament meeting programs.

The application provides a centralized place to view current and previous sacrament meetings, search meeting records, review meeting details, and securely access administrative functionality.

## Team Members

- Wilfredo Marapacuto

This project was completed individually with instructor authorization for team coursework.

## Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- Auth.js / NextAuth
- Neon PostgreSQL
- Vercel

## Live Application

Production deployment:

https://sacrament-meetings-two.vercel.app

## GitHub Repository

https://github.com/Wilfredo-Marapacuto/sacrament-meetings

## Main Features

- Responsive sacrament meeting interface
- Current and previous meeting views
- Dynamic meeting data stored in PostgreSQL
- Meeting search and pagination
- Individual meeting detail pages
- Administrator authentication
- Protected administrative routes
- Reusable React components
- Next.js App Router architecture
- API Route Handlers
- Production deployment through Vercel
- Loading, error, and empty states
- Accessibility-focused color contrast

## Authentication

Administrator authentication is implemented using Auth.js / NextAuth with the Credentials provider.

The administrator login page is available at:

https://sacrament-meetings-two.vercel.app/login

Administrative routes require a valid authenticated session.

Authentication credentials are configured through environment variables and are not stored directly in the source code.

## Database

The application uses a PostgreSQL database hosted by Neon.

Meeting information is retrieved dynamically from the database rather than being hardcoded in the user interface.

The database connection is configured through the `DATABASE_URL` environment variable.

## API Routes

### Get Meetings

`GET /api/meetings`

Returns sacrament meeting records from the PostgreSQL database.

An optional `date` query parameter can be used to retrieve meetings for a specific date.

Example:

`GET /api/meetings?date=2026-06-21`

### Get Meeting by ID

`GET /api/meetings/[id]`

Returns an individual sacrament meeting by its database ID.

### Authentication

`/api/auth/[...nextauth]`

Handles administrator authentication through Auth.js / NextAuth.

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/Wilfredo-Marapacuto/sacrament-meetings.git