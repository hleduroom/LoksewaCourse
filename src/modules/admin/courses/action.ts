"use server";

import { revalidatePath } from "next/cache";

import Mux from "@mux/mux-node";
import { v2 as cloudinary } from "cloudinary";
import { and, eq, sql } from "drizzle-orm";

import {
  type CreateChapterSchema,
  type CreateCourseSchema,
  type CreatePriceSchema,
  type CreateVideoSchema,
  createChapterSchema,
  createCourseSchema,
  createPriceSchema,
  createVideoSchema,
} from "@/modules/admin/courses/schema";

import db from "@/db";
import { chapter, course, muxData, subscription } from "@/db/schema";

// import { CloudinaryVideoResponse } from "./form/chapter-video-form";

cloudinary.config({
  cloud_name: "dfrb7mglo",
  api_key: "948178121471247",
  api_secret: "5pTBJnhaH6-iaF8V2BSMJX-D-bQ",
});

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

// TODO ADD AUTHORIZATION
export async function getSignedEndpoint() {
  const directUpload = await mux.video.uploads.create({
    cors_origin: "*",
    new_asset_settings: {
      playback_policy: ["public"],
    },
  });
  return {
    id: directUpload.id,
    assetId: directUpload.asset_id,
    url: directUpload.url,
  };
}

const waitForThreeSeconds = () =>
  new Promise((resolve) => setTimeout(resolve, 3000));

export async function createVideo(
  courseId: string,
  chapterId: string,
  uploadId: string
) {
  try {
    let attempts = 0;

    while (attempts <= 10) {
      const upload = await mux.video.uploads.retrieve(uploadId);
      if (upload.asset_id) {
        const asset = await mux.video.assets.retrieve(upload.asset_id);

        const existingMuxData = await db.query.muxData.findFirst({
          where: (t, { eq }) => eq(t.chapterId, chapterId),
        });

        if (existingMuxData) {
          await mux.video.assets.delete(existingMuxData.assetId);
          await db.delete(muxData).where(eq(muxData.id, existingMuxData.id));
        }

        await db.insert(muxData).values({
          assetId: upload.asset_id,
          chapterId: chapterId,
          playbackId: asset.playback_ids?.[0].id,
        });
        revalidatePath(`/admin/courses/${courseId}/${chapterId}`);
        return { success: true, message: "Successfully updated video!" };
      } else {
        await waitForThreeSeconds();
        attempts++;
      }
    }
    return { success: false, message: "Server is busy!" };
  } catch {
    return { success: false, message: "Error while updating video!" };
  }
}

// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export async function getCourses() {
  const result = await db.query.course.findMany({});
  return result;
}

export async function getPublishedCourses() {
  const result = await db
    .select()
    .from(course)
    .where(eq(course.isPublished, true))
    .orderBy(sql`RANDOM()`)
    .limit(10);

  return result;
}


export async function getCourse(courseId: string) {
  const result = await db.query.course.findFirst({
    where: (t, { eq }) => eq(course.id, courseId),
    with: {
      chapters: {
        orderBy: (c, { asc }) => [asc(c.position)],
      },
    },
  });
  return result;
}

export async function createCourseAction(payload: CreateCourseSchema) {
  try {
    const validatedData = createCourseSchema.safeParse(payload);

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      };
    }
    const result = await db
      .insert(course)
      .values({
        serviceId: validatedData.data.serviceId,
        title: validatedData.data.title,
        description: validatedData.data.description,
      })
      .returning({ courseId: course.id });
    revalidatePath("/admin/courses");

    return {
      success: true,
      courseId: result[0].courseId,
      message: "Course added successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
export async function createPriceAction(payload: CreatePriceSchema) {
  try {
    const validatedData = createPriceSchema.safeParse(payload);

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      };
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
export async function createVideoAction(payload: CreateVideoSchema) {
  try {
    const validatedData = createVideoSchema.safeParse(payload);

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      };
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
// UPDATE
export async function updateCourse(
  courseId: string,
  payload: Partial<typeof course.$inferInsert>
) {
  try {
    await db.update(course).set(payload).where(eq(course.id, courseId));
    revalidatePath(`/admin/courses/${courseId}`);

    return { success: true, message: "Successfully updated course!" };
  } catch {
    return { success: false, message: "Error while updating course!" };
  }
}

export async function updateCourseToBePublished(courseId: string) {
  try {
    const result = await db.query.course.findFirst({
      where: (t, { eq, and }) =>
        and(eq(course.id, courseId), eq(course.isPublished, false)),
      with: {
        chapters: {
          where: (t, { eq }) => eq(t.isPublished, true),
          limit: 1,
        },
      },
    });

    const hasPublisedChapters = result?.chapters.some((c) => c.isPublished);
    if (!hasPublisedChapters || !result?.title || !result?.description) {
      return {
        success: false,
        message: "Please considering adding all required fields!",
      };
    }

    await db
      .update(course)
      .set({
        isPublished: true,
      })
      .where(eq(course.id, courseId));
    revalidatePath(`/admin/courses/${courseId}`);
    return { success: true, message: "Successfully updated course!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error while updating course!" };
  }
}
export async function updateCourseToBeUnPublished(courseId: string) {
  try {
    await db
      .update(course)
      .set({
        isPublished: false,
      })
      .where(eq(course.id, courseId));
    revalidatePath(`/admin/courses/${courseId}`);

    return { success: true, message: "Successfully updated course!" };
  } catch {
    return { success: false, message: "Error while updating course!" };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await db.delete(course).where(eq(course.id, courseId));
    revalidatePath("/admin/courses");
    return { success: true, message: "Successfully deleted course!" };
  } catch {
    return { success: false, message: "Error while deleting course!" };
  }
}

// export async function uploadVideo(formData: FormData) {
//   const file = formData.get("file") as File;
//   // const chapterId = formData.get("chapterId") as string;

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const result = await new Promise<CloudinaryVideoResponse>(
//     (resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "video",
//           folder: "video-uploads",
//           transformation: [{ quality: "auto", fetch_format: "mp4" }],
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result as unknown as CloudinaryVideoResponse);
//         }
//       );
//       uploadStream.end(buffer);
//     }
//   );
//   // console.log(result);

//   // await db.insert(video).values({
//   //   chapterId: chapterId,
//   //   publicId: result.public_id,
//   //   duration: String(result.duration),
//   //   url: result.secure_url,
//   //   size: result.bytes,
//   // });
//   // console.log(result);
//   return { success: true, data: result };
// }

// CHAPTERS
export async function createChapterAction(payload: CreateChapterSchema) {
  try {
    const validatedData = createChapterSchema.safeParse(payload);
    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.errors[0].message,
      };
    }

    const lastChapter = await db.query.chapter.findFirst({
      columns: {
        position: true,
      },
      where: (fields, { eq }) => eq(fields.courseId, payload.courseId),
      orderBy: (fields, { desc }) => [desc(fields.position)],
    });
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    await db.insert(chapter).values({
      courseId: validatedData.data.courseId,
      title: validatedData.data.title,
      position: newPosition,
    });

    revalidatePath(`/admin/courses/${validatedData.data.courseId}`);
    return {
      success: true,
      message: "Chapter saved successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
export async function chaptersReorderAction(
  payload: { id: string; position: number }[]
) {
  try {
    for (const item of payload) {
      await db
        .update(chapter)
        .set({
          position: item.position,
        })
        .where(eq(chapter.id, item.id));
    }

    return {
      success: true,
      message: "Chapter saved successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
export async function updateChapter(
  courseId: string,
  chapterId: string,
  payload: Partial<typeof chapter.$inferInsert>
) {
  try {
    await db.update(chapter).set(payload).where(eq(chapter.id, chapterId));

    revalidatePath(`/admin/courses/${courseId}/${chapterId}`);
    return { success: true, message: "Successfully updated chapter!" };
  } catch {
    return { success: false, message: "Error while updating chapter!" };
  }
}
export async function updateChapterToBePublished(chapterId: string) {
  try {
    const result = await db.query.chapter.findFirst({
      where: (t, { eq, and }) =>
        and(eq(chapter.id, chapterId), eq(chapter.isPublished, false)),
      with: {
        videos: {
          where: (t, { eq }) => eq(t.isPublished, true),
          limit: 1,
        },
      },
    });

    // CHECK FOR VIDEO URL TOO
    if (!result || !result.title || !chapter.description) {
      return {
        success: false,
        message: "Please considering adding all required fields!",
      };
    }

    const res = await db
      .update(chapter)
      .set({
        isPublished: true,
      })
      .where(eq(chapter.id, chapterId))
      .returning({ courseId: chapter.courseId });

    revalidatePath(`/admin/courses/${res[0]?.courseId}/${chapterId}`);
    return { success: true, message: "Successfully updated chapter!" };
  } catch {
    return { success: false, message: "Error while updating chapter!" };
  }
}
export async function updateChapterToBeUnPublished(chapterId: string) {
  try {
    const result = await db
      .update(chapter)
      .set({
        isPublished: false,
      })
      .where(eq(chapter.id, chapterId))
      .returning({ courseId: chapter.courseId });

    const publishedChapters = await db.query.chapter.findFirst({
      where: (t, { eq, and }) =>
        and(eq(chapter.id, chapterId), eq(chapter.isPublished, true)),
    });

    if (!publishedChapters) {
      await db
        .update(course)
        .set({ isPublished: false })
        .where(eq(course.id, result[0].courseId));
    }

    revalidatePath(`/admin/courses/${result[0]?.courseId}/${chapterId}`);
    return { success: true, message: "Successfully updated chapter!" };
  } catch {
    return { success: false, message: "Error while updating chapter!" };
  }
}
export async function deleteChapter({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}) {
  try {
    await db.delete(chapter).where(eq(chapter.id, chapterId));

    const publishedChapters = await db.query.chapter.findMany({
      where: (t, { eq, and }) =>
        and(eq(chapter.courseId, courseId), eq(chapter.isPublished, true)),
    });
    if (!publishedChapters) {
      await db
        .update(course)
        .set({ isPublished: false })
        .where(eq(course.id, courseId));
    }

    revalidatePath(`/admin/courses/${courseId}`);
    return { success: true, message: "Successfully deleted chapter!" };
  } catch {
    return { success: false, message: "Error while deleting chapter!" };
  }
}
export async function getChapter(chapterId: string) {
  // if (!chapterId || !isUuid(chapterId)) {
  //   throw new Error(`Invalid chapterId: ${chapterId}`);
  // }

  const result = await db.query.chapter.findFirst({
    where: (t, { eq }) => eq(chapter.id, chapterId),
    with: {
      muxData: {
        where: (t, { eq }) => eq(t.isPublished, true),
        limit: 1,
      },
    },
  });

  return result;
}

function isUuid(chapterId: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(chapterId);
}
// VIDEO

// export async function createVideo(courseId: string, chapterId: string, payload: CloudinaryVideoResponse) {
//   try {
//     await db.insert(video).values({
//       assetId: payload.asset_id,
//       publicId: payload.public_id,
//       url: payload.url,
//       secureUrl: payload.secure_url,
//       playbackUrl: payload.playback_url,
//       folder: payload.folder,
//       duration: payload.duration,
//       format: payload.format,
//       size: (payload.bytes / (1024 * 1024)),
//       width: payload.width,
//       height: payload.height,
//       chapterId: chapterId,
//       isPublished: true
//     })

//     revalidatePath(`/admin/courses/${courseId}/${chapterId}`);
//     return { success: true, message: "Successfully created video!" }
//   } catch (error) {
//     console.log(error)
//     return { success: false, message: "Error while creeating video!" }
//   }
// }

export interface CloudinaryImageResponse {
  public_id: string;
  secure_url: string;
  url: string;
}

export async function saveCourseThumbnail(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    const courseId = formData.get("courseId") as string;

    if (!file || !courseId) {
      throw new Error("Missing image file or course ID.");
    }

    const existingCourse = await db.query.course.findFirst({
      where: eq(course.id, courseId),
      columns: { thumbnailPublicId: true },
    });

    if (existingCourse?.thumbnailPublicId) {
      await cloudinary.uploader.destroy(existingCourse.thumbnailPublicId, {
        resource_type: "image",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryImageResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "courses",
            transformation: [{ quality: "auto", fetch_format: "webp" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as unknown as CloudinaryImageResponse);
          }
        );
        uploadStream.end(buffer);
      }
    );

    await db
      .update(course)
      .set({
        thumbnailPublicId: result.public_id,
        thumbnailUrl: result.secure_url,
      })
      .where(eq(course.id, courseId));

    revalidatePath(`/admin/courses/${courseId}`);

    return { success: true, message: "Updated course thumbnail!" };
  } catch (error) {
    console.error("Failed to save course thumbnail:", error);
    return {
      success: false,
      message: "Error while updating course thumbnail!",
    };
  }
}

export async function getCoursesByServiceId(serviceId: string) {
  const courses = await db
    .select()
    .from(course)
    .where(
      and(
        eq(course.isPublished, true),
        eq(course.serviceId, serviceId)
      )
    );

  return courses;
}

export async function getUserSubscription(courseId: string, userId: string) {
  if (!userId || !courseId) return null;


  const userSub = await db.query.subscription.findFirst({
    where: and(
      eq(subscription.courseId, courseId),
      eq(subscription.userId, userId),
      eq(subscription.isActive, true),
    ),
  });

  return !!userSub;
}



export async function hasActiveSubscription(
  userId: string,
  courseId: string
): Promise<boolean> {
  if (!userId || !courseId) return false;

  const sub = await db.query.subscription.findFirst({
    where: and(
      eq(subscription.userId, userId),
      eq(subscription.courseId, courseId),
      eq(subscription.isActive, true)
    ),
  });

  return !!sub;
}


export async function getSubscribedCourses(userId: string) {
  const result = await db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .leftJoin(course, eq(subscription.courseId, course.id));

  return result.map((item) => item.course);
}