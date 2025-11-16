export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  lessonCount: number;
  resourceCount: number;
  color: string;
}

export const subjects: Subject[] = [
  {
    id: "shorthand",
    name: "Pitman Shorthand",
    description: "Master the art of rapid writing with comprehensive Pitman shorthand lessons",
    icon: "✍️",
    lessonCount: 45,
    resourceCount: 120,
    color: "blue",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "From basic arithmetic to advanced calculus and linear algebra",
    icon: "🔢",
    lessonCount: 80,
    resourceCount: 250,
    color: "green",
  },
  {
    id: "science",
    name: "Science",
    description: "Explore physics, chemistry, and biology with interactive lessons",
    icon: "🔬",
    lessonCount: 60,
    resourceCount: 180,
    color: "purple",
  },
  {
    id: "languages",
    name: "Languages",
    description: "Learn new languages with structured courses and practice materials",
    icon: "🌍",
    lessonCount: 50,
    resourceCount: 200,
    color: "orange",
  },
  {
    id: "programming",
    name: "Programming",
    description: "Build your coding skills from basics to advanced software development",
    icon: "💻",
    lessonCount: 70,
    resourceCount: 300,
    color: "red",
  },
  {
    id: "business",
    name: "Business & Economics",
    description: "Understand business principles, economics, and financial literacy",
    icon: "📊",
    lessonCount: 40,
    resourceCount: 150,
    color: "yellow",
  },
];
