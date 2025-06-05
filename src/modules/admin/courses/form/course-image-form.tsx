"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import CustomImage from "@/components/global/custom-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { saveCourseThumbnail } from "../action";

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      }
    )
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
      message: `Max file size is 5MB.`,
    }),
});

interface CourseImageFormProps {
  courseId: string;
  imageUrl?: string;
}

const CourseImageForm = ({ courseId, imageUrl }: CourseImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const imageFile = form.watch("image")?.[0];

  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      const file = values.image?.[0];
      if (file) {
        formData.append("image", file);
        formData.append("courseId", courseId);

        const response = await saveCourseThumbnail(formData);
        if (response.success) {
          form.reset();
          toggleEdit();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Chapter Thumbnail</CardTitle>
        <CardDescription>
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit thumbnail
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <>{imageUrl ? <CustomImage url={imageUrl} /> : <p>NO IMAGE</p>}</>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        disabled={isSubmitting}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e.target.files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {previewUrl && (
                <div className="relative">
                  <CustomImage url={previewUrl} />

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => form.reset()}
                    disabled={isSubmitting}
                    type="button"
                    className="absolute top-2 right-2"
                  >
                    <Trash />
                  </Button>
                </div>
              )}

              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Please wait</span>
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseImageForm;
