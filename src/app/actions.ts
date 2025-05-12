'use server';

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addTodo(title: string) {
  await db.insert(todos).values({
    title,
    completed: false,
  });
  revalidatePath("/");
}

export async function toggleTodo(id: number) {
  const [todo] = await db.select().from(todos).where(eq(todos.id, id));
  if (todo) {
    await db.update(todos)
      .set({ completed: !todo.completed })
      .where(eq(todos.id, id));
    revalidatePath("/");
  }
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function getTodos() {
  return await db.select().from(todos).orderBy(todos.createdAt);
}