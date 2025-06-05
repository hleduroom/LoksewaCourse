"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Check, Trash, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  deleteChapter,
  updateChapterToBePublished,
  updateChapterToBeUnPublished,
} from "../action";
import ConfirmChapterDeleteModal from "./confirm-chapter-delete-modal";

interface ChapterActionsProps {
  courseId: string;
  chapterId: string;
  disabled: boolean;
  isPublished: boolean;
}

const ChapterActions = ({
  courseId,
  chapterId,
  disabled,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const result = await deleteChapter({ chapterId, courseId });
      if (result.success) {
        toast.success(result.message);
        router.refresh();
        router.push(`/admin/courses/${courseId}`);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong while deleting course");
    } finally {
      setIsLoading(false);
    }
  };

  // ADD VALIDATIONS FOR PUBLISHING AND UNPUBLISHING ON ACTION
  // COURSE UNPUBLISH IF NO CHAPTERS
  const onPublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        const result = await updateChapterToBeUnPublished(chapterId);
        if (result.success) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await updateChapterToBePublished(chapterId);
        if (result.success) {
          toast.success(result.message);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      }
    } catch {
      toast.error("Something went wrong while publishing course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        variant={isPublished ? "destructive" : "outline"}
        size="sm"
        onClick={onPublish}
      >
        {isPublished ? (
          <>
            <X />
            <span>Unpublish</span>
          </>
        ) : (
          <>
            <Check />
            <span>Publish</span>
          </>
        )}
      </Button>
      <ConfirmChapterDeleteModal onConfirm={onDelete}>
        <Button variant="destructive" size="icon" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmChapterDeleteModal>
    </div>
  );
};

export default ChapterActions;
