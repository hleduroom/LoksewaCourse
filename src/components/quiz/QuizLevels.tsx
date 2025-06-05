import { serviceLevels } from "@/data/job";

import QuizLevelList from "./QuizLevelList";

interface QuizLevelsProps {
  topic: string;
}

export default function QuizLevels({ topic }: QuizLevelsProps) {
  const serviceName = decodeURIComponent(topic);
  const levels = serviceLevels[serviceName.toLowerCase()] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-16 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-5 text-center text-2xl font-bold md:text-3xl">
          Select a Quiz Level
        </h2>
        <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
          Choose a level under{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {serviceName}
          </span>
        </p>
        <QuizLevelList serviceName={serviceName} levels={levels} />
      </div>
    </div>
  );
}
