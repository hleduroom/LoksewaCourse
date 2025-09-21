import QuizClient from "@/components/quiz/QuizQuestionPage";

interface QuizPageProps {
  params: {
    topic: string;
    level: string;
    quiz_namee: string;
  };
}

export default function Page({ params }: QuizPageProps) {
  return (
    <QuizClient
      topic={params.topic}
      level={params.level}
      quiz_namee={params.quiz_namee}
    />
  );
}