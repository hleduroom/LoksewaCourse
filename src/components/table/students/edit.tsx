"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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

import { editUsers } from "@/actions/users";
import { user } from "@/db/schema";
import { cn } from "@/lib/utils";
import { EditUserFormSchema, TEditUserFormSchema } from "@/schema/users";

const EditUserDialog = ({ data }: { data: typeof user.$inferInsert }) => {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<TEditUserFormSchema>({
    resolver: zodResolver(EditUserFormSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role!,
    },
  });

  async function onSubmit(values: TEditUserFormSchema) {
    setPending(true);
    const response = await editUsers(values);
    if (response.success) {
      setOpen(false);
    }

    setPending(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>TITLE</DialogTitle>
          <DialogDescription>DESCRIPTION</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={pending}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">user</SelectItem>
                      <SelectItem value="teacher">teacher</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={pending}>
                <span>Submit</span>{" "}
                <Loader2
                  className={cn("hidden animate-spin", pending && "block")}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
