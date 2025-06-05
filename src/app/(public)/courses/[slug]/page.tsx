import { getCourse, hasActiveSubscription } from "@/modules/admin/courses/action";

import NotFound from "@/components/ui/notFound";
import CourseDetailClient from "@/components/video/CourseDetailClient";
import { getSessions } from "@/actions/sessions";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  let activeSubscription = false;

  const session = await getSessions()
  const { slug } = await params;
  const course = await getCourse(slug);
  if (session?.user?.id && course?.id) {
    activeSubscription = await hasActiveSubscription(session.user.id, course.id);
  }
  if (!course) return <NotFound />;

  return <CourseDetailClient course={course} hasActiveSubscription={activeSubscription} />;
}
