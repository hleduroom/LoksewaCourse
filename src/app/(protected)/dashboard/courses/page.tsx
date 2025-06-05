import { getSubscribedCourses } from "@/modules/users/courses/action";
import SubscribedCourseList from "@/modules/users/courses/components/subscribed-course-list";

import Container from "@/components/global/container";

const page = async () => {
  const courses = await getSubscribedCourses();
  return (
    <Container>
      <SubscribedCourseList courses={courses} />
    </Container>
  );
};

export default page;
