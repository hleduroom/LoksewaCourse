import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowLeft, LayoutDashboard } from "lucide-react";

import { getChapter, getSignedEndpoint } from "@/modules/admin/courses/action";
import ChapterActions from "@/modules/admin/courses/components/chapter-actions";
import ChapterAccessForm from "@/modules/admin/courses/form/chapter-access-form";
import ChapterContentForm from "@/modules/admin/courses/form/chapter-content-form";
import ChapterDescriptionForm from "@/modules/admin/courses/form/chapter-description-form";
import ChapterTitleForm from "@/modules/admin/courses/form/chapter-title-form";
import ChapterVideoForm from "@/modules/admin/courses/form/chapter-video-form";

import Banner from "@/components/global/banner";
import Container from "@/components/global/container";
import { Separator } from "@/components/ui/separator";

export default async function page({
  params,
}: {
  params: Promise<{ chapterId: string; courseId: string }>;
}) {
  const { courseId, chapterId } = await params;
  const chapter = await getChapter(chapterId);

  if (!chapter) {
    return redirect("/");
  }
  const signedEndpoint = await getSignedEndpoint();

  const requiredFields = [chapter.title, chapter.description];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <Container className="space-y-10 pb-10">
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course!"
        />
      )}
      <div className="w-full">
        <Link
          href={`/admin/courses/${courseId}`}
          className="mb-6 flex items-center text-sm transition hover:opacity-75"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to course setup
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm opacity-80">
              Complete all fields {completionText}
            </span>
          </div>

          <ChapterActions
            courseId={courseId}
            chapterId={chapterId}
            isPublished={chapter.isPublished}
            disabled={!isComplete}
          />
        </div>
      </div>
      {/*  */}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 sm:col-span-6">
          <div>
            <div className="flex items-center gap-x-2 pb-2">
              <LayoutDashboard />
              <h2>Customize Information</h2>
            </div>
            <Separator />
          </div>

          <ChapterTitleForm
            courseId={courseId}
            chapterId={chapterId}
            title={chapter.title}
          />
          <ChapterDescriptionForm
            courseId={courseId}
            chapterId={chapterId}
            description={chapter.description ?? ""}
          />
          <ChapterAccessForm
            courseId={courseId}
            chapterId={chapterId}
            isFree={chapter.isFree}
          />
        </div>
        {/*  */}
        <div className="col-span-12 space-y-6 sm:col-span-6">
          <div>
            <div className="flex items-center gap-x-2 pb-2">
              <LayoutDashboard />
              <h2>Customize Content</h2>
            </div>
            <Separator />
          </div>
          <ChapterContentForm
            courseId={courseId}
            chapterId={chapterId}
            content={chapter.content ?? ""}
          />
          <ChapterVideoForm
            courseId={courseId}
            chapterId={chapterId}
            endpoint={signedEndpoint}
            video={chapter.muxData[0]}
          />
        </div>
      </div>
    </Container>
  );
}
