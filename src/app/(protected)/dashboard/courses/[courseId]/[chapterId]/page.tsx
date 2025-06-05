import { getChapter } from "@/modules/users/courses/action";

import Container from "@/components/global/container";
import RichTextEditor from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";

const page = async ({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) => {
  const { chapterId } = await params;
  const chapter = await getChapter(chapterId);

  if (!chapter) {
    return <h1>NOTHING TO RENDER</h1>;
  }

  return (
    <Container>
      <Badge>{chapter?.isFree ? "FREE" : "PAID"}</Badge>
      <h2>{chapter?.title}</h2>
      <p>{chapter.description}</p>
      <RichTextEditor value={chapter?.content} />
    </Container>
  );
};

export default page;
