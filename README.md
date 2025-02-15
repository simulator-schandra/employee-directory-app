# Employee Directory Application

A full-stack TypeScript application for managing employee records with authentication and PostgreSQL database integration.

## Features

- User Authentication (Register/Login)
- Employee Management (CRUD operations)
- PostgreSQL Database Integration
- Responsive UI with shadcn/ui components
- Protected Routes
- Session-based Authentication

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Push the database schema:

```bash
npm run db:push
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Production Build

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Application pages
├── server/                # Backend Express application
│   ├── auth.ts           # Authentication setup
│   ├── db.ts             # Database connection
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data access layer
└── shared/               # Shared TypeScript types
    └── schema.ts         # Database schema
```

## API Endpoints

### Authentication
- POST `/api/register` - Register new user
- POST `/api/login` - Login user
- POST `/api/logout` - Logout user
- GET `/api/user` - Get current user

### Employees
- GET `/api/employees` - List all employees
- GET `/api/employees/:id` - Get employee by ID
- POST `/api/employees` - Create new employee
- PATCH `/api/employees/:id` - Update employee
- DELETE `/api/employees/:id` - Delete employee

## Dependencies

### Frontend
- React
- TanStack Query
- shadcn/ui
- Tailwind CSS
- wouter (routing)
- react-hook-form
- zod (validation)

### Backend
- Express
- Passport.js
- Drizzle ORM
- PostgreSQL

## License

MIT
