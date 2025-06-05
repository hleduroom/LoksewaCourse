import { z } from "zod";

export const EditUserFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
});
export type TEditUserFormSchema = z.infer<typeof EditUserFormSchema>;
