"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { user } from "@/db/schema";

import EditStudentDialog from "./edit";

export const columns: ColumnDef<typeof user.$inferInsert>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditStudentDialog data={row.original} />
          <Button size="icon" variant="destructive">
            <Trash />
          </Button>
        </div>
      );
    },
  },
  // .
];
