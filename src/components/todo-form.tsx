"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/app/actions";
import { useTransition } from "react";

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    if (title.trim()) {
      startTransition(async () => {
        await addTodo(title);
        formRef.current?.reset();
      });
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex items-center space-x-2"
    >
      <Input
        type="text"
        name="title"
        placeholder="Add a new todo..."
        className="flex-1"
        required
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}