import React from "react";
import { getSessions } from "@/actions/sessions";
import { getCourse, hasActiveSubscription } from "@/modules/admin/courses/action";
import CourseVideoPage from "@/components/video/VideoPlayer";
import NotFound from "@/components/ui/notFound";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const course = await getCourse(slug);

  if (!course) {
    return <NotFound />;
  }

  const session = await getSessions();

  if (Number(course?.price) === 0) {
    return <CourseVideoPage course={course} />;
  }

  if (session?.user?.id) {
    const activeSubscription = await hasActiveSubscription(session.user.id, course.id);
    if (activeSubscription) {
      return <CourseVideoPage course={course} />;
    }
  }

  return <NotFound />;
}