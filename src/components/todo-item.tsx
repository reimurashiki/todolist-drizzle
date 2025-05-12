"use client";

import { useOptimistic, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { deleteTodo, toggleTodo } from "@/app/actions";
import { X } from "lucide-react";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

export function TodoItem({ id, title, completed: initialCompleted }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();
  const [completed, setOptimisticCompleted] = useOptimistic<boolean, boolean>(
    initialCompleted,
    (state, newState) => newState
  );

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticCompleted(!completed);
      await toggleTodo(id);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTodo(id);
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <Checkbox
        id={`todo-${id}`}
        checked={completed}
        onCheckedChange={handleToggle}
        disabled={isPending}
      />
      <label
        htmlFor={`todo-${id}`}
        className={`flex-1 ${completed ? "line-through text-gray-500" : ""}`}
      >
        {title}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8"
        disabled={isPending}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}