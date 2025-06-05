"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { BookOpen, HelpCircle, Video } from "lucide-react";

import { Button } from "@/components/ui/button";

const topicDescriptions = {
  "public service commission":
    "Master the Public Service Commission syllabus with curated video lessons, practice quizzes, and reference books tailored to help you succeed in government job exams.",
  engineering:
    "Sharpen your engineering knowledge with concept-driven videos, technical quizzes, and standard reference books. Ideal for Loksewa engineering aspirants.",
  "nepal army":
    "Prepare for Nepal Army recruitment with discipline-specific content — interactive lessons, tactical quizzes, and essential handbooks for physical and written tests.",
  "nepal police":
    "Enhance your preparation for Nepal Police exams with focused video lessons, legal and general knowledge quizzes, and foundational books.",
  "teacher commission":
    "Ace the Teacher Commission exams with pedagogical resources, curriculum-based quizzes, and educational guides crafted for aspiring educators.",
  "nepal health service":
    "Target your Nepal Health Service preparation with lessons covering health science topics, scenario-based quizzes, and clinical reference books.",
  banking:
    "Crack banking exams with quantitative, logical reasoning, and financial concept videos, plus quizzes and updated banking-related books.",
};

const LearningSection = () => {
  const { topic } = useParams();

  const router = useRouter();
  const decodedTopic = decodeURIComponent(topic || "").toLowerCase();
  const description =
    topicDescriptions[decodedTopic] ||
    "Access interactive video lessons, explore engaging quizzes, and read essential books to boost your Loksewa preparation. Perfect for all skill levels, anytime, anywhere.";

  const handleTestClick = () => {
    router.push(`/services/${topic}/quiz`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white p-10 text-gray-900 transition-colors duration-300 lg:p-16 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-900 dark:text-white">
      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-5 text-center text-2xl font-bold md:text-3xl">
            Learn the Smart Way
          </h2>
          <p className="mb-8 max-w-xl text-lg text-gray-700 dark:text-gray-300">
            {description}
          </p>

          <div className="grid max-w-lg grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Video */}
            <div className="rounded-xl bg-gray-100 p-5 text-center shadow-md transition hover:scale-105 dark:bg-[#1e2a4c]">
              <Video className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
              <p className="text-2xl font-bold">100+</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Video Lessons
              </p>
            </div>

            {/* Quizzes */}
            <div className="rounded-xl bg-gray-100 p-5 text-center shadow-md transition hover:scale-105 dark:bg-[#1e2a4c]">
              <HelpCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Quizzes
              </p>
            </div>

            {/* Books */}
            <div className="rounded-xl bg-gray-100 p-5 text-center shadow-md transition hover:scale-105 dark:bg-[#1e2a4c]">
              <BookOpen className="mx-auto mb-2 h-8 w-8 text-purple-500" />
              <p className="text-2xl font-bold">30+</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Books</p>
            </div>
          </div>

          <Button onClick={handleTestClick} className="mt-6 cursor-pointer">
            Test Your Knowledge
          </Button>
        </div>

        <div className="hidden lg:block">
          <img
            src="/undraw1.svg"
            alt="Learning Illustration"
            className="mx-auto w-full max-w-xs"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute -top-20 -left-32 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 opacity-50 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 opacity-30 blur-2xl dark:bg-blue-400/5" />

    </section>
  );
};

export default LearningSection;
