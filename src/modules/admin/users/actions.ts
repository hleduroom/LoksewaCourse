"use server";

import { headers } from "next/headers";

import { and, eq, inArray } from "drizzle-orm";

import db from "@/db";
import { userProgress } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getUserProgress(courseId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, percentage: 0 };
    }

    const publishedChapters = await db.query.chapter.findMany({
      where: (t, { eq, and }) =>
        and(eq(t.courseId, courseId), eq(t.isPublished, true)),
      columns: { id: true },
    });

    if (publishedChapters.length === 0) {
      return { success: true, percentage: 0 };
    }

    const publishedChapterIds = publishedChapters.map((c) => c.id);

    const completedCount = await db.$count(
      userProgress,
      and(
        eq(userProgress.userId, session.user.id),
        eq(userProgress.isCompleted, true),
        inArray(userProgress.chapterId, publishedChapterIds)
      )
    );
    const progressPercentage =
      (completedCount / publishedChapterIds.length) * 100;

    return { success: true, percentage: progressPercentage };
  } catch {
    return { success: false, percentage: 0 };
  }
}
