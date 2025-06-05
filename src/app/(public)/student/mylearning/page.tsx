
import { getSubscribedCourses } from "@/modules/admin/courses/action";
import CourseGridMyLearning from "@/components/video/CourseGridMyLearning";
import { getSessions } from "@/actions/sessions";


export default async function MyLearningPage() {
  const session = await getSessions()

  const courses = session?.user?.id
    ? await getSubscribedCourses(session.user.id)
    : [];
  console.log(courses)
  return (
    <div className="px-6 py-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">My Learning</h1>
      {courses.length === 0 ? (
        <p className="text-white">You haven’t subscribed to any courses yet.</p>
      ) : (
        <CourseGridMyLearning courses={courses} />
      )}
    </div>
  );
}
