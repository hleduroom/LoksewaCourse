"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateCourse } from "@/modules/admin/courses/action";

import SubmitButton from "@/components/global/submit-button";
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

interface CourseServiceFormProps {
  courseId: string;
  service: string;
}

const formSchema = z.object({
  service: z.string(),
});

const CourseServiceForm = ({ courseId, service }: CourseServiceFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: service,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await updateCourse(courseId, values);
      toast.success("Service updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Course Service</CardTitle>
        <CardDescription>
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit service
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing && <p className="text-sm">{service}</p>}

        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="service"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton loading={!isValid || isSubmitting} />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseServiceForm;
