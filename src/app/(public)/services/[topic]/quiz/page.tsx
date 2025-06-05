import QuizLevels from "@/components/quiz/QuizLevels";

interface PageProps {
  params: { topic: string };
}

export default function Page({ params }: PageProps) {
  return <QuizLevels topic={params.topic} />;
}
