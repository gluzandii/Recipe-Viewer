First clone the repository and navigate to the project directory,
then do all of this.

## Environment Variables

Create a `.env` file in the `backend-rv` directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=secret-key
```

**Important**:

- Replace the `DATABASE_URL` with your actual PostgreSQL connection string

## Installation & Setup

### 1. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend-rv
pnpm install

# Install backend dependencies
cd ../backend-rv
pnpm install
```

### 2. Database Setup

Generate and run database migrations:

```bash
cd backend-rv

# Generate migration files (if schema changed)
# Make sure drizzle is installed and configured and setup
# Just install the dev dependency if not already
pnpm db:generate

# Run migrations to create tables
pnpm db:migrate
```

This will create the following tables:

- `users` - User accounts
- `recipes` - Recipe information
- `recipe_ingredients` - Ingredients for each recipe

## Buildind

Follow these steps in order to build the complete application manually:

### Step 1: Build Frontend

```bash
cd frontend-rv
pnpm build
```

This creates a production build in `frontend-rv/dist/`

### Step 2: Copy Frontend Build to Backend

```bash
# From the project root directory
rm -rf backend-rv/build
cp -r frontend-rv/dist backend-rv/build
```

This copies the built React app into the backend's `build` folder, allowing the Express server to serve it.

### Step 3: Build Backend

```bash
cd backend-rv
pnpm build
```

This compiles TypeScript to JavaScript in `backend-rv/dist/`

## Running the Application

**Backend:**

```bash
cd backend-rv
pnpm start
```

Or just run

```bash
cd backend-rv
node dist/index.js
```

Everything runs on: `http://localhost:3000`
