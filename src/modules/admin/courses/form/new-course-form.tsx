"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCourseAction } from "@/modules/admin/courses/action";
import {
  type CreateCourseSchema,
  createCourseSchema,
} from "@/modules/admin/courses/schema";

import SubmitButton from "@/components/global/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const NewCourseForm = () => {
  const router = useRouter();

  const [pending, setPending] = useState(false);

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(payload: CreateCourseSchema) {
    setPending(true);
    const result = await createCourseAction(payload);

    if (result.success) {
      form.reset();
      router.push(`/admin/courses/${result?.courseId}`);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={pending} />
      </form>
    </Form>
  );
};

export default NewCourseForm;
