export type QuizQuestion = {
  question: string;
  options: string[];
};

export type QuizMeta = {
  name: string;
  author: string;
  timeLimit: number;
  totalMarks: number;
  difficulty: string;
  subscription: "free" | "paid";
  price?: number;
  instructions?: string;
  questions: QuizQuestion[];
};

export type QuizData = {
  [service: string]: {
    [level: string]: QuizMeta[];
  };
};

export const quizData: QuizData = {
  engineering: {
    "computer-engineering": [
      {
        name: "OOSE quiz",
        author: "santosh tiwari",
        timeLimit: 25,
        totalMarks: 25,
        difficulty: "easy",
        subscription: "free",
        instructions: "No negative marking. 25 minutes only.",
        questions: [
          {
            question: "Which model is not a software development model?",
            options: ["Waterfall", "V-Model", "Spiral", "Mechanical"],
          },
          {
            question: "Which one is not part of SDLC?",
            options: ["Planning", "Testing", "Welding", "Deployment"],
          },
        ],
      },
      {
        name: "Related to chemistry",
        author: "nabin dhami",
        timeLimit: 25,
        totalMarks: 25,
        difficulty: "medium",
        subscription: "paid",
        price: 199,
        instructions: "No negative marking. 25 minutes only.",
        questions: [
          {
            question: "Chemical formula of glucose?",
            options: ["C10H10O10", "C6H1206", "C12H10O6", "C2H2O2"],
          },
          {
            question:
              "Which of the following was NOT a practical use of chemistry developed by early chemists (17th-19th centuries)?",
            options: ["anesthetics", "rubber", "batteries", "microscopes"],
          },
        ],
      },
    ],
    "civil engineering": [
      {
        name: "Structural Analysis",
        author: "sugam adhikari",
        timeLimit: 30,
        totalMarks: 25,
        difficulty: "complex",
        subscription: "paid",
        price: 249,
        questions: [
          {
            question: "What does RCC stand for?",
            options: [
              "Reinforced Cement Concrete",
              "Rural Cement Construction",
              "Resistant Cement Core",
              "None of the above",
            ],
          },
        ],
      },
    ],
  },
  "public service commission": {
    kharidar: [
      {
        name: "History of nepal",
        author: "susan shrestha",
        timeLimit: 150,
        totalMarks: 125,
        difficulty: "complex",
        subscription: "paid",
        price: 299,
        instructions: "125 Questions in 150 minutes. No negative marking.",
        questions: [
          {
            question: "First Nepali Pm?",
            options: [
              "Bhimsen thapa",
              "prithivi narayan sha",
              "kp oli",
              "sher badur dewa",
            ],
          },
        ],
      },
    ],
  },
};
