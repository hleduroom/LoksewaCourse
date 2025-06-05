type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type QuizData = {
  [service: string]: {
    [level: string]: {
      easy: QuizQuestion[];
      medium: QuizQuestion[];
      complex: QuizQuestion[];
    };
  };
};

export const quizData: QuizData = {
  "public service commission": {
    kharidar: {
      easy: [
        {
          question: "What is the capital of Nepal?",
          options: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"],
          answer: "Kathmandu",
        },
        {
          question: "What is the capital of Nepal?",
          options: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"],
          answer: "Kathmandu",
        },
        {
          question: "What is the capital of Nepal?",
          options: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"],
          answer: "Kathmandu",
        },
        {
          question: "What is the capital of Nepal?",
          options: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"],
          answer: "Kathmandu",
        },
      ],
      medium: [
        {
          question: "When was Nepal declared a republic?",
          options: ["2005", "2006", "2007", "2008"],
          answer: "2008",
        },
      ],
      complex: [
        {
          question: "Who chaired the first Constituent Assembly of Nepal?",
          options: [
            "Ram Baran Yadav",
            "Subash Chandra Nembang",
            "Pushpa Kamal Dahal",
            "Girija Prasad Koirala",
          ],
          answer: "Subash Chandra Nembang",
        },
      ],
    },
  },
};
