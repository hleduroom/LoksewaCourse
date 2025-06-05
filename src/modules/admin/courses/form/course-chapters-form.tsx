"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  chaptersReorderAction,
  createChapterAction,
} from "@/modules/admin/courses/action";
import ChaptersList from "@/modules/admin/courses/components/chapters-list";

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

import { chapter } from "@/db/schema";
import { cn } from "@/lib/utils";

interface CourseChaptersFormProps {
  courseId: string;
  chapters: (typeof chapter.$inferSelect)[];
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Course title is required!" }),
  courseId: z.string().uuid(),
});

const CourseChaptersForm = ({
  courseId,
  chapters,
}: CourseChaptersFormProps) => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleCreating = () => {
    setIsCreating((curr) => !curr);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: courseId,
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createChapterAction(values);
      toast.success("Chapter created!");
      toggleCreating();
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (data: { id: string; position: number }[]) => {
    setIsEditing(true);
    try {
      await chaptersReorderAction(data);
      toast.success("Chapters reordered!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsEditing(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/admin/courses/${courseId}/${id}`);
  };

  return (
    <Card className="relative">
      {isEditing && (
        <div className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center rounded-md backdrop-blur-xs">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Course Chapters</CardTitle>
        <CardDescription>
          <Button variant="ghost" onClick={toggleCreating}>
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add a chapter
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isCreating && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g 'Introduction to the course'"
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
                  "Create"
                )}
              </Button>
            </form>
          </Form>
        )}

        {!isCreating && (
          <div
            className={cn(
              "mt-2 text-sm",
              !chapters.length && "text-slate-500 italic"
            )}
          >
            {!chapters.length && "No chapters"}

            <ChaptersList
              items={chapters}
              onEdit={onEdit}
              onReorder={onReorder}
            />
          </div>
        )}
        {!isCreating && (
          <p className="text-muted-foreground mt-4 text-xs">
            Drop and drop to order the chapters
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseChaptersForm;
