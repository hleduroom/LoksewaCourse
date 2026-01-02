import QuizLevels from "@/components/quiz/QuizLevels";

export default async function Page({ 
  params 
}: { 
  params: Promise<{ topic: string }> 
}) {
  const { topic } = await params;
  return <QuizLevels topic={topic} />;
}