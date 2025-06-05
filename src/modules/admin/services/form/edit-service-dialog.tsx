"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

import { updateServiceAction } from "../action";
import { CreateServiceSchema, createServiceSchema } from "../schema";
import { IService } from "../table/columns";

interface EditServiceDialogProps {
  service: IService;
}

const EditServiceDialog = ({ service }: EditServiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      id: service.id,
      title: service.title,
      description: service.description ?? "",
    },
  });

  async function onSubmit(values: CreateServiceSchema) {
    try {
      setIsPending(true);
      const result = await updateServiceAction(values);
      if (result.success) {
        setOpen(false);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Error while updating service!");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit2 />
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild disabled={isPending}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />} Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceDialog;
