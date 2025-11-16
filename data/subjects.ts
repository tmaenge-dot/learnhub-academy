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
  {
    id: "history",
    name: "World History",
    description: "Journey through human civilization from ancient times to the modern era",
    icon: "🏛️",
    lessonCount: 65,
    resourceCount: 220,
    color: "indigo",
  },
  {
    id: "art",
    name: "Art & Design",
    description: "Explore creative expression through drawing, painting, and digital design",
    icon: "🎨",
    lessonCount: 35,
    resourceCount: 180,
    color: "pink",
  },
  {
    id: "music",
    name: "Music Theory",
    description: "Learn music fundamentals, composition, and instrument techniques",
    icon: "🎵",
    lessonCount: 42,
    resourceCount: 160,
    color: "violet",
  },
  {
    id: "philosophy",
    name: "Philosophy & Ethics",
    description: "Explore critical thinking, logic, and ethical reasoning",
    icon: "🤔",
    lessonCount: 38,
    resourceCount: 140,
    color: "teal",
  },
];
