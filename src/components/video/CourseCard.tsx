import Image from "next/image";
import { BadgeCheck, CheckCircle, CreditCard, Tag } from "lucide-react";
import { FiGift } from "react-icons/fi";
import { useEffect, useState } from "react";
import { hasActiveSubscription } from "@/modules/admin/courses/action";
import { getSessions } from "@/actions/sessions";

export default function CourseCard({ course }: { course: any }) {
  const isFree = Number(course?.price) === 0;
  const [activeSubscription, setActiveSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const session = await getSessions();
      if (session?.user?.id && course?.id) {
        const result = await hasActiveSubscription(session.user.id, course.id);
        setActiveSubscription(result);
      }
    };

    checkSubscription();
  }, [course?.id]);

  return (
    <a
      href={`/courses/${course?.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div className="flex h-[360px] flex-col rounded-xl border border-gray-200 bg-gray-100 p-3 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800">
        <div className="mb-3">
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
        </div>
        <div className="flex flex-grow flex-col justify-between text-left">
          <div>
            <h3 className="mb-1 line-clamp-2 text-base font-semibold text-gray-900 dark:text-white">
              {course?.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {course?.description}
            </p>
          </div>

          <div className="mt-3 flex items-center space-x-2 text-sm font-semibold">
            {isFree ? (
              <span className="flex items-center text-green-600">
                <FiGift className="mr-1 h-4 w-4" /> Free
              </span>
            ) : activeSubscription ? (
              <div className="flex items-center space-x-2 text-green-600">
                <span className="line-through text-sm text-gray-500 dark:text-gray-400">
                  Rs {course.price}
                </span>
                <span className="flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" /> Subscribed
                </span>
              </div>
            ) : (
              <span className="flex items-center text-purple-600">
                <CreditCard className="mr-1 h-4 w-4" /> Rs {course.price}
              </span>
            )}
          </div>

        </div>
      </div>
    </a>
  );
}
