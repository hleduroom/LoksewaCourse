"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateChapter } from "@/modules/admin/courses/action";

import RichTextEditor from "@/components/rich-text-editor";
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

interface ChapterContentFormProps {
  courseId: string;
  chapterId: string;
  content: string;
}

const formSchema = z.object({
  content: z.string().min(1, { message: "Chapter content is required!" }),
});

const ChapterContentForm = ({
  courseId,
  chapterId,
  content,
}: ChapterContentFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateChapter(courseId, chapterId, values);
      toast.success("Content updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Chapter Content</CardTitle>
        <CardDescription>
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit content
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing && <RichTextEditor value={content} />}

        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichTextEditor
                        editable
                        disabled={isSubmitting}
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

export default ChapterContentForm;
