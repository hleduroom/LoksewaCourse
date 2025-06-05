import { z } from "zod";

export const createServiceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3),
  description: z.string().min(8).max(100),
  icon: z.string().min(1)
});
export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
