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
    color: "orange",
  },
  {
    id: "information-processing",
    name: "Information Processing",
    description: "Master web development and digital information management skills",
    icon: "💻",
    lessonCount: 30,
    resourceCount: 85,
    color: "amber",
  },
];
