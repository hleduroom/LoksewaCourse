import { z } from "zod";

export const createCourseSchema = z.object({
  serviceId: z.string().uuid(),
  title: z.string().min(3),
  description: z.string().min(8).max(100),
});
export type CreateCourseSchema = z.infer<typeof createCourseSchema>;

export const createChapterSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(3).max(10),
});
export type CreateChapterSchema = z.infer<typeof createChapterSchema>;

export const createPriceSchema = z.object({
  courseId: z.string().uuid(),
  price: z.coerce.number().min(100).max(10000),
});
export type CreatePriceSchema = z.infer<typeof createPriceSchema>;

export const createVideoSchema = z.object({
  chapterId: z.string().uuid(),
  file: z.instanceof(File).refine((file) => file.type.startsWith("video/"), {
    message: "File must be a valid video format",
  }),
});
export type CreateVideoSchema = z.infer<typeof createVideoSchema>;
