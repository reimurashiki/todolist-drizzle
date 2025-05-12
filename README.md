# Next.js Todo List with Drizzle ORM and Neon PostgreSQL

A modern, full-stack todo list application built with Next.js 15, Drizzle ORM, Neon PostgreSQL, and shadcn/ui components.

## Features

- Server Components and Server Actions for optimal performance
- PostgreSQL database with Neon (serverless Postgres)
- Type-safe database operations with Drizzle ORM
- Modern UI components from shadcn
- Optimistic updates for better UX
- Loading states and skeleton UI
- Form validation and error handling

## Prerequisites

- Node.js 18.17 or later
- A Neon PostgreSQL database
- npm or your preferred package manager

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd todolist-drizzle
```

2. Install dependencies:
```bash
npm install
```

3. Create a Neon PostgreSQL database at https://neon.tech and get your connection string.

4. Update the database connection:
   - In `src/db/index.ts`
   - In `drizzle.config.ts`
   Replace the connection strings with your Neon database URL: (in the repo just an example)
```typescript
connectionString: "your-neon-database-url"
```

5. Generate and run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Features in Detail

### Database Schema

The todo items are stored in a PostgreSQL table with the following schema:

```typescript
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

### Server Actions

The application uses Next.js Server Actions for all CRUD operations:

- `addTodo` - Create a new todo
- `toggleTodo` - Toggle todo completion status
- `deleteTodo` - Remove a todo
- `getTodos` - Fetch all todos

### Optimistic Updates

The app implements optimistic updates for a better user experience:

- Immediate UI updates when toggling todos
- Loading states during server operations
- Error handling with fallbacks

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.
