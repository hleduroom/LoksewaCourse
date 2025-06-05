"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateChapter } from "@/modules/admin/courses/action";

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
import { Textarea } from "@/components/ui/textarea";

interface ChapterDescriptionFormProps {
  courseId: string;
  chapterId: string;
  description: string;
}

const formSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Chapter description is required!" }),
});

const ChapterDescriptionForm = ({
  courseId,
  chapterId,
  description,
}: ChapterDescriptionFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateChapter(courseId, chapterId, values);
      toast.success("Description updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle> Chapter Description</CardTitle>
        <CardDescription>
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edit description
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!isEditing && <p className="text-sm">{description}</p>}

        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

export default ChapterDescriptionForm;
