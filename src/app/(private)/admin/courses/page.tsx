import { getCourses } from "@/modules/admin/courses/action";
import CoursesList from "@/modules/admin/courses/components/courses-list";
import AddCourseDialog from "@/modules/admin/courses/form/add-course-dialog";
import { getServices } from "@/modules/admin/services/action";

import Container from "@/components/global/container";

export default async function page() {
  const courses = await getCourses();
  const services = await getServices();

  return (
    <Container className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <AddCourseDialog services={services} />
      </div>

      <CoursesList courses={courses} />
    </Container>
  );
}
