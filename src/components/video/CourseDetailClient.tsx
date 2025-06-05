"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import parse from "html-react-parser";
import { X } from "lucide-react"
import { PlayCircle, Star, Plus, Minus } from "lucide-react";
import VideoPlayer from "@/components/video/DemoVideoPlayer";
import PaymentPopup from "@/components/video/videoPayment";

export default function CourseDetailClient({
  course,
  hasActiveSubscription,
}: {
  course: any;
  hasActiveSubscription: boolean;
}) {
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const [openChapters, setOpenChapters] = useState<{ [key: number]: boolean }>({});

  const toggleChapter = (index: number) => {
    setOpenChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePlayClick = () => {
    if (Number(course?.price) === 0 || hasActiveSubscription) {
      router.push(`/courses/${course.id}/watch`);
    } else {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    router.push(`/payment/start-payment?courseId=${course?.id}`);
  };

  return (
    <div className="relative z-10 min-h-screen bg-white px-6 py-10 dark:bg-gray-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-6 md:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            {course?.title}
          </h1>
          <p className="text-base text-gray-700 dark:text-gray-300">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" />
              {course?.rating} • {course?.students?.toLocaleString()} students
            </span>
            <span>{course?.totalLectures} lectures</span>
            <span>{course?.totalDuration} total length</span>
          </div>

          {/* What you'll learn */}
          <div className="mt-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              What you'll learn
            </h2>
            <div className="space-y-4">
              {course?.chapters?.map((ch: any, i: number) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all"
                >
                  <button
                    className="cursor-pointer flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => toggleChapter(i)}
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {ch?.title}
                      </h3>
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300 leading-snug flex items-start gap-2">
                        <span className="text-center text-gray-500">-</span>
                        {ch?.description}
                      </p>

                    </div>
                    <div className="ml-4">
                      {openChapters[i] ? (
                        <Minus className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${openChapters[i]
                      ? 'max-h-[500px] px-4 pb-4 pt-2'
                      : 'max-h-0 px-4 overflow-hidden'
                      }`}
                  >
                    {openChapters[i] && ch?.content && (
                      <>
                        <hr className="my-2 border-gray-300 dark:border-gray-600" />
                        <div className="prose max-w-none dark:prose-invert">
                          {parse(ch.content)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>




          {course?.previewVideoUrl && (
            <div className="mt-8">
              <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Watch Preview
              </h2>
              <VideoPlayer url={course?.previewVideoUrl} />
            </div>
          )}


          {course?.content && (
            <div className="mt-10">
              <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                Course Details
              </h2>
              <div className="prose max-w-none dark:prose-invert">
                {parse(course.content)}
              </div>
            </div>
          )}
        </div>

        <div className="relative rounded-lg border p-4 shadow-lg dark:border-gray-700">
          <div className="group relative">
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                width={300}
                height={170}
                className="h-[170px] w-full rounded-md object-cover"
              />
            ) : (
              <div className="flex h-[170px] w-full items-center justify-center rounded-md bg-gray-300 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                No Image
              </div>
            )}
            {course?.subscription === "paid" && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <PlayCircle className="h-16 w-16" />
              </button>
            )}
          </div>

          <div className="text-xl mt-2">
            {Number(course?.price) === 0 ? (
              <span className="text-green-600 font-semibold flex items-center gap-2">
                Price: ₹0 <X className="w-5 h-5 text-red-500" />
              </span>
            ) : hasActiveSubscription ? (
              <span className="line-through text-green-600 font-semibold">Price: ₹{course?.price}</span>
            ) : (
              <span className=" dark:text-gray-300 text-gray-600 font-semibold">Price: ₹{course?.price}</span>
            )}
          </div>

          {Number(course?.price) === 0 && (
            <div className="mt-2 inline-block rounded-full bg-blue-100 text-green-900 text-sm font-medium px-3 py-1">
              Free
            </div>
          )}
          {hasActiveSubscription && (
            <div className="mt-2 inline-block rounded-full bg-blue-100 text-green-900 text-sm font-medium px-3 py-1">
              Subscribed
            </div>
          )}

          <button
            className={` cursor-pointer w-full mt-4 px-4 py-2 rounded font-semibold transition bg-purple-600 hover:bg-purple-700 text-white shadow-md`}
            onClick={handlePlayClick}
          >
            {Number(course?.price) === 0
              ? "Start Learning"
              : hasActiveSubscription
                ? "Continue Learning"
                : "Buy Now"}
          </button>


        </div>
      </div>

      {showPayment && (
        <PaymentPopup
          onConfirm={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}

      <div className="pointer-events-none absolute -top-20 -left-32 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 opacity-50 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 opacity-30 blur-2xl dark:bg-blue-400/5" />
    </div>
  );
}
