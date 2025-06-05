"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { motion } from "framer-motion";
import { CheckCircle, DollarSign, Flame, Gauge, Smile } from "lucide-react";

import QuizStats from "@/components/quiz/QuizStats";
import { Button } from "@/components/ui/button";

import { QuizMeta, quizData } from "@/data/mock";

import PurchaseModal from "./quizPayment";

const difficulties = ["All", "Easy", "Medium", "Complex"];

const QuizListPage = () => {
  const router = useRouter();
  const { topic, level } = useParams();
  const serviceName = decodeURIComponent(topic as string).toLowerCase();
  const levelName = decodeURIComponent(level as string);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizMeta | null>(null);

  const allQuizzes: QuizMeta[] = quizData[serviceName]?.[levelName] || [];

  const filteredQuizzes =
    selectedDifficulty === "All"
      ? allQuizzes
      : allQuizzes.filter(
          (q) =>
            q.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase()
        );

  const handleStartQuiz = (quiz: QuizMeta) => {
    if (quiz.subscription === "free") {
      const encodedQuizName = encodeURIComponent(quiz.name);
      window.open(
        `/services/${serviceName}/quiz/${levelName}/mocktest/${encodedQuizName}`,
        "_blank"
      );
    } else {
      setSelectedQuiz(quiz);
      setShowModal(true);
    }
  };

  const handleBuyQuiz = async () => {
    if (!selectedQuiz) return;
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setShowModal(false);
      const encodedQuizName = encodeURIComponent(selectedQuiz.name);
      router.push(
        `/services/${serviceName}/quiz/${levelName}/mocktest/${encodedQuizName}`
      );
    }, 2000);
  };

  return (
    <div className="mx-auto w-full space-y-6 dark:bg-gray-900">
      <QuizStats quizData={allQuizzes} />

      <div className="flex flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <h1 className="text-xl font-semibold">Available Quizzes</h1>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="difficulty"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Filter by Difficulty:
          </label>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          >
            {difficulties.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredQuizzes.length === 0 ? (
        <div className="p-6 text-gray-500 dark:text-gray-400">
          No quizzes found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col justify-between space-y-4 rounded-2xl border bg-white p-5 shadow-lg transition-all duration-200 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-600">
                  {quiz.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {quiz.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By: {quiz.author}
                  </p>

                  {quiz.difficulty && (
                    <div className="mt-1 flex items-center space-x-1 text-sm">
                      {quiz.difficulty.toLowerCase() === "easy" && (
                        <>
                          <Smile className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">Easy</span>
                        </>
                      )}
                      {quiz.difficulty.toLowerCase() === "medium" && (
                        <>
                          <Gauge className="h-4 w-4 text-yellow-500" />
                          <span className="text-yellow-600">Medium</span>
                        </>
                      )}
                      {quiz.difficulty.toLowerCase() === "complex" && (
                        <>
                          <Flame className="h-4 w-4 text-red-500" />
                          <span className="text-red-600">Complex</span>
                        </>
                      )}
                    </div>
                  )}

                  {quiz.subscription === "free" ? (
                    <div className="mt-1 flex items-center space-x-1 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">Free</span>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center space-x-1 text-sm">
                      <DollarSign className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-600">
                        Paid{quiz.price ? ` - ₹${quiz.price}` : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                <div>{quiz.timeLimit} min</div>
                <div>{quiz.totalMarks} Ques</div>
              </div>

              <Button
                onClick={() => handleStartQuiz(quiz)}
                className="cursor-pointer"
              >
                Start Test
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && selectedQuiz && (
        <PurchaseModal
          quiz={selectedQuiz}
          onClose={() => setShowModal(false)}
          onBuy={handleBuyQuiz}
        />
      )}
    </div>
  );
};

export default QuizListPage;
