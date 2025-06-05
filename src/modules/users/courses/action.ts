"use server";

import { headers } from "next/headers";

import { and, count, eq, getTableColumns, gte, sql } from "drizzle-orm";

import db from "@/db";
import { chapter, course, subscription, userProgress } from "@/db/schema";
import { auth } from "@/lib/auth";

// COURSE PROGRESS

// export async function getCourseProgress(courseId: string) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   if (!session) {
//     return new Error("Unauthorized");
//   }

//   const totalChapters = await db
//     .select({ count: count() })
//     .from(chapter)
//     .where(eq(chapter.courseId, courseId));

//   const userProgressCount = await db
//     .select({ count: count() })
//     .from(userProgress)
//     .where(eq(userProgress.chapterId, chapterId));
// }
export async function getSubscribedCourses() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return [];
  }
  const result = await db
    .select({
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnailUrl: course.thumbnailUrl,
      chaptersCount: sql<number>`count(${chapter.id})`.as("chapters_count"),
    })
    .from(course)
    .leftJoin(subscription, eq(course.id, subscription.courseId))
    .leftJoin(chapter, eq(course.id, chapter.courseId))
    .where(
      and(
        eq(subscription.userId, session.user.id),
        gte(subscription.endDate, new Date()),
        eq(chapter.isPublished, true)
      )
    )
    .groupBy(course.id);

  return result;
}

export async function getChapters(courseId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return [];
  }

  const data = await db.query.chapter.findMany({
    columns: {
      id: true,
      title: true,
      position: true,
      isFree: true,
    },
    where: (t, { and, eq }) =>
      and(eq(t.courseId, courseId), eq(t.isPublished, true)),
  });

  return data;
}
export async function getChapter(chapterId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return {};
  }

  const data = await db.query.chapter.findFirst({
    where: (t, { eq }) => eq(t.id, chapterId),
    with: {
      muxData: true,
    },
  });

  return data;
}
