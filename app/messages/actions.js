"use server";

import { revalidatePath } from "next/cache";
import { messages } from "@/lib/db";

export async function deleteMessageAction(formData) {
  const id = Number(formData.get("id"));

  const index = messages.findIndex((msg) => msg.id === id);

  if (index === -1) {
    return {
      success: false,
      error: "Pesan tidak ditemukan.",
    };
  }

  messages.splice(index, 1);

  revalidatePath("/messages");

  return {
    success: true,
  };
} 