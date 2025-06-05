import { getChapters } from "@/modules/users/courses/action";
import ChapterList from "@/modules/users/courses/components/chapter-list";

export default async function CourseLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;
  const chapters = await getChapters(courseId);

  return (
    <div className="grid h-screen grid-cols-12">
      <div className="col-span-3 hidden sm:grid">
        <ChapterList courseId={courseId} chapters={chapters} />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
}
