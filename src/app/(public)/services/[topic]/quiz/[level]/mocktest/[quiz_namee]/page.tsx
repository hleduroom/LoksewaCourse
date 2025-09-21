import QuizClient from "@/components/quiz/QuizQuestionPage";

// @ts-expect-error Next.js 15 PageProps type is incorrect
const Page: any = ({ params }: { params: { topic: string; level: string; quiz_namee: string } }) => {
  return (
    <QuizClient
      topic={params.topic}
      level={params.level}
      quiz_namee={params.quiz_namee}
    />
  );
};

export default Page;