"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import EditServiceDialog from "../form/edit-service-dialog";

export interface IService {
  id: string;
  title: string;
  description: string | null;
}

export const columns: ColumnDef<IService>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <EditServiceDialog service={row.original} />
          <Button size="icon" variant="destructive">
            <Trash />
          </Button>
        </div>
      );
    },
  },
  // .
];
