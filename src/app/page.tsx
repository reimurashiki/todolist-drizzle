import { Suspense } from "react";
import { getTodos } from "./actions";
import { TodoForm } from "@/components/todo-form";
import { TodoItem } from "@/components/todo-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TodoSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 animate-pulse">
          <div className="h-4 w-4 rounded-sm bg-gray-200" />
          <div className="h-4 flex-1 bg-gray-200 rounded" />
          <div className="h-8 w-8 rounded-md bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

async function TodoList() {
  const todos = await getTodos();

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos yet. Add one above!</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Todo List
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TodoForm />
          <Suspense fallback={<TodoSkeleton />}>
            <TodoList />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}
