import { redirect } from "next/navigation";

import { LayoutDashboard } from "lucide-react";

import { getCourse } from "@/modules/admin/courses/action";
import CourseActions from "@/modules/admin/courses/components/course-actions";
import CourseChaptersForm from "@/modules/admin/courses/form/course-chapters-form";
import CourseContentForm from "@/modules/admin/courses/form/course-content-form";
import CourseDescriptionForm from "@/modules/admin/courses/form/course-description-form";
import CourseImageForm from "@/modules/admin/courses/form/course-image-form";
import CoursePriceForm from "@/modules/admin/courses/form/course-price-form";
import CourseTitleForm from "@/modules/admin/courses/form/course-title-form";

import Banner from "@/components/global/banner";
import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";

export default async function page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <Container className="space-y-10 pb-10">
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible in the courses!"
        />
      )}

      {/* TITLE DESCTIPTION */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm opacity-80">
            Complete all fields {completionText}
          </span>
        </div>

        <CourseActions
          courseId={courseId}
          disabled={!isComplete}
          isPublished={course.isPublished}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 sm:col-span-6">
          <div>
            <div className="flex items-center gap-x-2 pb-2">
              <LayoutDashboard />
              <h2>Customize Information</h2>
            </div>
            <Separator />
          </div>

          <CourseTitleForm courseId={courseId} title={course.title} />
          <CourseDescriptionForm
            courseId={courseId}
            description={course.description ?? ""}
          />
          <CoursePriceForm courseId={courseId} price={course.price || ""} />
          <CourseImageForm
            courseId={courseId}
            imageUrl={course.thumbnailUrl ?? ""}
          />
        </div>

        <div className="col-span-12 space-y-6 sm:col-span-6">
          <div>
            <div className="flex items-center gap-x-2 pb-2">
              <LayoutDashboard />
              <h2>Customize Content</h2>
            </div>
            <Separator />
          </div>

          <CourseContentForm
            courseId={courseId}
            content={course.content ?? ""}
          />
          <CourseChaptersForm courseId={courseId} chapters={course.chapters} />
        </div>
      </div>
    </Container>
  );
}
