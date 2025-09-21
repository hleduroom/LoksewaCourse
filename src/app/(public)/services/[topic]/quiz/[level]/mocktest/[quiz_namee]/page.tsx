import QuizClient from "@/components/quiz/QuizQuestionPage";

export default function Page({
  params,
}: {
  params: { topic: string; level: string; quiz_namee: string };
} & Record<string, any>) {
  return (
    <QuizClient
      topic={params.topic}
      level={params.level}
      quiz_namee={params.quiz_namee}
    />
  );
}