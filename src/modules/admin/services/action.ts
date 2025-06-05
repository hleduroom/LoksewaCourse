"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import db from "@/db";
import { serviceTable } from "@/db/schema";

import { CreateServiceSchema, createServiceSchema } from "./schema";

export async function getServices() {
  const result = await db.query.serviceTable.findMany();
  return result;
}

export async function createServiceAction(payload: CreateServiceSchema) {
  try {
    const validatedData = createServiceSchema.safeParse(payload);

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      };
    }
    await db.insert(serviceTable).values({
      title: validatedData.data.title,
      description: validatedData.data.description,
      icon: validatedData.data.icon
    });
    revalidatePath("/admin/services");

    return {
      success: true,
      message: "Success!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
export async function updateServiceAction(payload: CreateServiceSchema) {
  try {
    const validatedData = createServiceSchema.safeParse(payload);

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      };
    }
    await db
      .update(serviceTable)
      .set({
        title: validatedData.data.title,
        description: validatedData.data.description,
      })
      .where(eq(serviceTable.id, validatedData.data.id!));

    revalidatePath("/admin/services");
    return {
      success: true,
      message: "Success!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
