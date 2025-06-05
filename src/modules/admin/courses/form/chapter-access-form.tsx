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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

interface ChapterAccessFormProps {
  courseId: string;
  chapterId: string;
  isFree: boolean;
}

const formSchema = z.object({
  isFree: z.boolean(),
});

const ChapterAccessForm = ({
  courseId,
  chapterId,
  isFree,
}: ChapterAccessFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!isFree,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateChapter(courseId, chapterId, values);
      toast.success("Title updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Chapter Access</CardTitle>
        <CardDescription>
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit access
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <p className={cn("mt-2 text-sm", !isFree && "text-slate-500 italic")}>
            {isFree ? (
              <>This chapter is free for preview.</>
            ) : (
              <>This chapter is not free.</>
            )}
          </p>
        )}
        {isEditing && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        Check this box if you want to make this chapter free for
                        preview
                      </FormDescription>
                    </div>
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
      </CardContent>
    </Card>
  );
};

export default ChapterAccessForm;
