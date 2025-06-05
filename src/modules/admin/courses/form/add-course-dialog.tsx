"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { IService } from "@/modules/admin/services/table/columns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createCourseAction } from "../action";
import { CreateCourseSchema, createCourseSchema } from "../schema";

const AddCourseDialog = ({ services }: { services: IService[] }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      serviceId: services[0]?.id,
    },
  });

  async function onSubmit(values: CreateCourseSchema) {
    try {
      setIsPending(true);
      const result = await createCourseAction(values);
      if (result.success) {
        setOpen(false);
        toast.success(result.message);
        router.push(`/admin/courses/${result?.courseId}`);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Error while creating course!");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircleIcon /> Add course
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>TITLE</DialogTitle>
          <DialogDescription>DESCRIPTION</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g Computer Operator 2024"
                      {...field}
                    />
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
                    <Input
                      placeholder="e.g Preparation classes for computer operator 2025."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild disabled={isPending}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />} Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseDialog;
