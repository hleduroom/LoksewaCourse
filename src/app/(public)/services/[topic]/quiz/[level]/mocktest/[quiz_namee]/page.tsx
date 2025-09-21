import QuizClient from "@/components/quiz/QuizQuestionPage";

// Do NOT import or extend any Next.js PageProps
export default function Page({
  params,
}: {
  params: {
    topic: string;
    level: string;
    quiz_namee: string;
  };
}) {
  return (
    <QuizClient
      topic={params.topic}
      level={params.level}
      quiz_namee={params.quiz_namee}
    />
  );
}