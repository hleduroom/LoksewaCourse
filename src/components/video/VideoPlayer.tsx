"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { getChapter } from "@/modules/admin/courses/action";
import parse from "html-react-parser";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

export default function CourseVideoPage({ course }: { course: any }) {
  const [currentVideo, setCurrentVideo] = useState<{
    title: string;
    playbackId: string;
    duration: string;
  } | null>(null);

  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  // Automatically load the first chapter
  useEffect(() => {
    if (!selectedChapterId && course?.chapters?.length > 0) {
      setSelectedChapterId(course.chapters[0].id);
    }
  }, [course, selectedChapterId]);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!selectedChapterId) return;

      try {
        const chapter = await getChapter(selectedChapterId);
        if (chapter?.muxData?.[0]?.playbackId) {
          setCurrentVideo({
            title: chapter.title,
            playbackId: chapter.muxData[0].playbackId,
            duration: chapter.duration || "",
          });
        } else {
          console.warn("No playbackId found for selected chapter");
        }
      } catch (err) {
        console.error("Error fetching chapter:", err);
      }
    };

    fetchVideo();
  }, [selectedChapterId]);

  if (!course) {
    return <div className="p-10 text-center text-lg">Course not found</div>;
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden md:flex-row">
        {/* Video Player */}
        <div className="flex h-64 md:h-[500px] w-full items-center justify-center bg-black md:w-2/3">
          {currentVideo?.playbackId ? (
            <MuxPlayer
              playbackId={currentVideo.playbackId}
              accentColor="#ac39f2"
              className="h-full w-full"
            />
          ) : (
            <div className="text-white">Loading video...</div>
          )}
        </div>

        {/* Sidebar with chapters */}
        <div className="h-full w-full overflow-y-auto bg-white p-4 md:w-1/3 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
            Course Content
          </h2>

          {course?.chapters?.map((chapter, i) => (
            <div
              key={chapter.id}
              className={`mb-2 flex cursor-pointer flex-col justify-between rounded-lg px-4 py-3 transition-colors sm:flex-row sm:items-center ${selectedChapterId === chapter.id
                ? "bg-purple-200 font-semibold text-black dark:bg-purple-50 dark:text-black"
                : "bg-gray-50 text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-800"
                }`}
              onClick={() => setSelectedChapterId(chapter.id)}
            >
              <div className="mb-1 flex items-center gap-2 sm:mb-0">
                <Play size={18} />
                <span className="text-sm sm:text-base">{`${i + 1}. ${chapter.title}`}</span>
              </div>
              <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                {chapter.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      {course?.content && (
        <div className="p-5">
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            Course Details
          </h2>
          <div className="prose max-w-none dark:prose-invert">
            {parse(course.content)}
          </div>
        </div>
      )}
    </>
  );
}
