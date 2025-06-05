"use client";

import { useState } from "react";

import MuxPlayer from "@mux/mux-player-react";
import MuxUploader from "@mux/mux-uploader-react";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createVideo } from "../action";

interface ChapterFormProps {
  courseId: string;
  chapterId: string;
  video: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    isPublished: boolean;
    assetId: string;
    chapterId: string | null;
    playbackId: string | null;
  };
  endpoint: {
    id: string;
    assetId: string | undefined;
    url: string;
  };
}
const ChapterVideoForm = ({
  courseId,
  chapterId,
  endpoint,
  video,
}: ChapterFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);

  const onSubmit = async () => {
    try {
      setIsEditing(true);
      const result = await createVideo(courseId, chapterId, endpoint.id);
      if (result.success) {
        toast.success(result.message);
      }
      toast.error(result.message);
    } catch {
      toast.error("Something went wrong while video uploading!");
    } finally {
      setIsEditing(false);
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
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit Video
              </>
            )}
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <MuxUploader
            aria-disabled={isEditing}
            onSuccess={onSubmit}
            onUploadError={(e) => {
              toast.error(e.detail.message);
            }}
            endpoint={endpoint.url}
          />
        ) : (
          <>
            {video && video.playbackId ? (
              <MuxPlayer playbackId={video.playbackId} accentColor="#ac39f2" />
            ) : (
              <p className="text-sm">No video uploaded yet.</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChapterVideoForm;
