import QuizLevels from "@/components/quiz/QuizLevels";

// @ts-expect-error Next.js 15 PageProps type is incorrect
export default function Page({ params }: { params: { topic: string } }) {
  return <QuizLevels topic={params.topic} />;
}