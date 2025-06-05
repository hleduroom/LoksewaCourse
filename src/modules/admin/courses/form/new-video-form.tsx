"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type CreateVideoSchema,
  createVideoSchema,
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

import { uploadVideo } from "../action";

const NewVideoForm = ({ chapterId }: { chapterId: string }) => {
  const [pending, setPending] = useState(false);
  const [url, setUrl] = useState("");

  const form = useForm<CreateVideoSchema>({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      chapterId: chapterId,
      file: undefined,
    },
  });

  async function onSubmit(values: CreateVideoSchema) {
    setPending(true);

    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("chapterId", values.chapterId);

    const result = await uploadVideo(formData);
    setUrl(result?.data?.secure_url);
    console.log({
      publicId: result.data.public_id,
      secure_url: result.data.secure_url,
    });
    setPending(false);
  }
  console.log(form.formState.errors);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    onBlur={field.onBlur}
                    ref={field.ref}
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton loading={pending} />
        </form>
      </Form>
      {url && <video src={url} autoPlay />}
    </div>
  );
};

export default NewVideoForm;
