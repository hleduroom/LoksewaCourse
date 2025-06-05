"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as Icons from "lucide-react";
import { serviceIconOptions } from '../../../../data/icons'
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

import { createServiceAction } from "../action";
import { CreateServiceSchema, createServiceSchema } from "../schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



const AddServiceDialog = () => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  async function onSubmit(values: CreateServiceSchema) {
    console.log("first");

    try {
      setIsPending(true);
      const result = await createServiceAction(values);
      if (result.success) {
        form.reset();
        setOpen(false);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Error while creating service!");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircleIcon /> Add service
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
                    <Input placeholder="e.g Computer Engineering" {...field} />
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
                      placeholder="e.g A computer engineer designs, develops, tests, and implements both computer hardware and software."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(val) => form.setValue("icon", val)}
                      value={form.watch("icon")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceIconOptions.map((iconName) => {
                          const LucideIcon = (Icons as any)[iconName];
                          return (
                            <SelectItem key={iconName} value={iconName}>
                              <div className="flex items-center space-x-2">
                                {LucideIcon && <LucideIcon className="h-4 w-4 text-purple-600" />}
                                <span>{iconName}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
                {isPending && <Loader2 className="animate-spin" />} Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
