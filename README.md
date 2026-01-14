# Event Management Platform

A full-stack event management application where **organizers** can create & publish events, and **users** can discover events and register to attend. Organizers also get a dashboard to track registrations and basic analytics.  
Built with Next.js (App Router), Clerk authentication, and shadcn/ui.

---

## Features

### User-facing
- Browse and search events (upcoming/past, categories, location, etc.)
- Event detail pages (agenda, venue, timing, organizer, capacity)
- Register / cancel registration (if enabled)
- Auth-protected user profile / registrations list

### Organizer-facing
- Organizer onboarding / role-based access
- Create events
- Manage attendee registrations

### Platform
- Authentication + session management via Clerk
- Protected routes & role-based authorization
- Responsive UI components via shadcn/ui
- Server-side rendering + server actions / route handlers 

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)  
- React
- TypeScript 
- shadcn/ui (Radix UI primitives + Tailwind patterns + Lucide-React)
- Tailwind CSS

### Backend (within Next.js)
- Next.js Route Handlers (`app/api/...`) and/or Server Actions
- Data access: Drizzle 
- Database: PostgreSQL
- DB-Platform: NeonDB

### Auth & Identity
- Clerk (Sign In/Up, sessions, middleware protection)

### Tooling / Platform
- Node.js
- Package manager: npm / pnpm / yarn 
- Deployment: Vercel 

---

## Architecture Overview

- **App Router** pages live under `app/`
- **API routes** (Route Handlers) live under `app/api/`
- **UI components** follow shadcn/ui conventions (commonly `components/ui`)

## Clone
```bash
git clone https://github.com/shahbaz957/Event_Management_Platform.git
cd Event_Management_Platform
```

## Clerk (required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_**

CLERK_SECRET_KEY=sk_**

## Clerk URLs (recommended)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

## Database (if applicable) (I used NeonDB (cloud based Postgres DB provider))
DATABASE_URL=...

## App
NEXT_PUBLIC_APP_URL=http://localhost:3000

- **Auth** handled by Clerk provider + middleware protection (recommended setup)

---

# Developer 
## Name : Mirza Shahbaz Ali Baig
📧 Email: mirzashahbazbaig724@gmail.com  
[💼 LinkedIn](https://www.linkedin.com/in/mirza-shahbaz-ali-baig-3391b3248/) 

---
# Live APP: 
## [🚀 Live App](https://event-bridge-ems.vercel.app/)
