// types/quizData.ts
export interface QuizTopic {
  title: string;
  description: string;
  image: string;
}

export const quizTopics: QuizTopic[] = [
  {
    title: "Science",
    description: "Explore the wonders of science.",
    image: "/images/science.svg",
  },
  {
    title: "Technology",
    description: "Dive into the latest technological advancements.",
    image: "/images/technology.svg",
  },
  {
    title: "Programming",
    description: "Learn about coding and software development.",
    image: "/images/programming.svg",
  },
  {
    title: "Computer Science",
    description: "Understand the fundamentals of computers and algorithms.",
    image: "/images/computer-science.svg",
  },
  {
    title: "Mathematics",
    description: "Master the language of numbers and patterns.",
    image: "/images/mathematics.svg",
  },
  {
    title: "History",
    description: "Discover the events that shaped our world.",
    image: "/images/history.svg",
  },
  {
    title: "Art",
    description: "Appreciate creativity through various forms of art.",
    image: "/images/art.svg",
  },
  {
    title: "Geography",
    description: "Explore the physical features of our planet.",
    image: "/images/geography.svg",
  },
  {
    title: "Physics",
    description: "Unravel the laws governing the universe.",
    image: "/images/physics.svg",
  },
];
