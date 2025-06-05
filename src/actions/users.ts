"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import db from "@/db";
import { user } from "@/db/schema";
import { EditUserFormSchema, TEditUserFormSchema } from "@/schema/users";

export async function getUsers() {
  const users = await db.select().from(user);
  return users;
}
export async function editUsers(data: TEditUserFormSchema) {
  const validate = EditUserFormSchema.safeParse(data);
  if (!validate.success) {
    return { success: false, error: validate.error };
  }

  await db.update(user).set({ role: data.role }).where(eq(user.id, data.id));
  revalidatePath("/admin");
  return {
    success: true,
  };
}
