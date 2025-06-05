import { getCourses } from "@/modules/admin/courses/action";

import EBooksPage from "@/components/book/book";
import LearningHighlight from "@/components/quiz/LearningHighlight";
import CoursesPageService from "@/components/video/CoursePageService";


export default async function ServicePage({ params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  return (
    <div>
      <LearningHighlight />
      <CoursesPageService serviceId={topic} />
      <EBooksPage />
    </div>
  );
}
