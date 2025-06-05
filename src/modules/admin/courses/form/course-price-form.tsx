"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateCourse } from "@/modules/admin/courses/action";

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

interface CoursePriceFormProps {
  courseId: string;
  price: string;
}

const formSchema = z.object({
  price: z.string(),
});

const CoursePriceForm = ({ courseId, price }: CoursePriceFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: price,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse(courseId, values);
      toast.success("Price updated!");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Course Price</CardTitle>
        <CardDescription>
          <Button variant="ghost" onClick={toggleEdit}>
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit price
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing && <p className="text-sm">{price}</p>}

        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="price"
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

export default CoursePriceForm;
