"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { QuizMeta, quizData } from "@/data/mock";

interface QuizClientProps {
  topic: string;
  level: string;
  quiz_namee: string;
}

export default function QuizClient({
  topic,
  level,
  quiz_namee,
}: QuizClientProps) {
  const service_name = decodeURIComponent(topic).toLowerCase();
  const level_name = decodeURIComponent(level);
  const quiz_name = decodeURIComponent(quiz_namee);

  const [quiz, setQuiz] = useState<QuizMeta | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const quizList = quizData[service_name]?.[level_name];
    const currentQuiz = quizList?.find((q) => q.name === quiz_name);
    if (currentQuiz) {
      setQuiz(currentQuiz);
      setTimeLeft(currentQuiz.timeLimit * 60);
    }
  }, [service_name, level_name, quiz_name]);

  useEffect(() => {
    if (!timeLeft) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (qIndex: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    if (quiz && Object.keys(selectedOptions).length < quiz.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    alert("Quiz submitted!");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!quiz)
    return (
      <div className="p-4 text-gray-800 dark:text-gray-200">
        Loading quiz...
      </div>
    );

  return (
    <div className="relative mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:min-w-[56rem] dark:bg-gray-900">
      <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:mb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{quiz.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By: {quiz.author} | {quiz.timeLimit} min | {quiz.totalMarks} Ques
          </p>
        </div>
        <div className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 dark:bg-red-800 dark:text-red-100">
          ⏰ {formatTime(timeLeft)}
        </div>
      </div>

      <Progress
        value={
          (Object.keys(selectedOptions).length / quiz.questions.length) * 100
        }
        className="mb-4"
      />

      {quiz.questions.map((question, index) => {
        const selected = selectedOptions[index];
        return (
          <div
            key={index}
            className="rounded-xl bg-white p-4 shadow-md sm:p-6 dark:bg-gray-800 dark:shadow dark:shadow-gray-700"
          >
            <div className="mb-3 text-base font-medium sm:text-lg">
              Q{index + 1}: {question.question}
            </div>

            <div className="space-y-2">
              {question.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-300 p-3 text-sm transition hover:bg-gray-50 sm:text-base dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt}
                    checked={selected === opt}
                    onChange={() => handleOptionSelect(index, opt)}
                    className="accent-primary h-5 w-5"
                  />
                  <span className="text-gray-800 dark:text-gray-200">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      <div className="text-center sm:text-right">
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(selectedOptions).length < quiz.questions.length}
          className="mt-4 sm:mt-6"
        >
          Submit Quiz
        </Button>
      </div>

      <div className="pointer-events-none absolute -top-20 -left-32 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 opacity-50 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 opacity-30 blur-2xl dark:bg-blue-400/5" />
    </div>
  );
}
