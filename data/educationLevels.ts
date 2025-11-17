export interface Course {
  id: string;
  name: string;
  icon: string;
  description: string;
  lessonCount: number;
  resourceCount: number;
}

export interface EducationLevel {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  courses: Course[];
}

export const educationLevels: EducationLevel[] = [
  {
    id: 'primary',
    name: 'Primary Education',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    gradient: 'bg-gradient-to-br from-pink-100 to-rose-100',
    description: 'Foundation learning for young minds',
    courses: [
      {
        id: 'basic-math',
        name: 'Basic Mathematics',
        icon: '🔢',
        description: 'Numbers, counting, basic operations, and fun math games',
        lessonCount: 45,
        resourceCount: 120,
      },
      {
        id: 'english-basics',
        name: 'English Basics',
        icon: '📝',
        description: 'Reading, writing, grammar, and vocabulary building',
        lessonCount: 50,
        resourceCount: 150,
      },
      {
        id: 'science-fun',
        name: 'Science Fun',
        icon: '🔬',
        description: 'Explore the world around us with exciting experiments',
        lessonCount: 30,
        resourceCount: 80,
      },
    ],
  },
  {
    id: 'secondary',
    name: 'Secondary Education',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    description: 'Advanced concepts for growing scholars',
    courses: [
      {
        id: 'mathematics',
        name: 'Mathematics',
        icon: '📐',
        description: 'Algebra, geometry, calculus, and advanced problem-solving',
        lessonCount: 85,
        resourceCount: 200,
      },
      {
        id: 'sciences',
        name: 'Sciences',
        icon: '⚗️',
        description: 'Physics, chemistry, biology - explore the scientific method',
        lessonCount: 90,
        resourceCount: 180,
      },
      {
        id: 'languages',
        name: 'Languages',
        icon: '🌍',
        description: 'English, literature, and foreign language studies',
        lessonCount: 70,
        resourceCount: 160,
      },
      {
        id: 'programming',
        name: 'Programming',
        icon: '💻',
        description: 'Introduction to coding, web development, and computer science',
        lessonCount: 60,
        resourceCount: 140,
      },
    ],
  },
  {
    id: 'tertiary',
    name: 'Tertiary Education',
    icon: '🎓',
    color: 'from-purple-500 to-indigo-500',
    gradient: 'bg-gradient-to-br from-purple-100 to-indigo-100',
    description: 'University-level advanced studies',
    courses: [
      {
        id: 'advanced-programming',
        name: 'Advanced Programming',
        icon: '🚀',
        description: 'Data structures, algorithms, software engineering, AI/ML',
        lessonCount: 100,
        resourceCount: 250,
      },
      {
        id: 'business',
        name: 'Business & Economics',
        icon: '💼',
        description: 'Management, finance, marketing, and entrepreneurship',
        lessonCount: 80,
        resourceCount: 190,
      },
      {
        id: 'research',
        name: 'Research Methods',
        icon: '🔍',
        description: 'Academic writing, data analysis, and research techniques',
        lessonCount: 50,
        resourceCount: 120,
      },
    ],
  },
  {
    id: 'tvet',
    name: 'TVET (Vocational)',
    icon: '🛠️',
    color: 'from-orange-500 to-amber-500',
    gradient: 'bg-gradient-to-br from-orange-100 to-amber-100',
    description: 'Practical skills for career success',
    courses: [
      {
        id: 'shorthand',
        name: 'Shorthand (Pitman)',
        icon: '✍️',
        description: 'Master professional shorthand writing for fast note-taking',
        lessonCount: 42,
        resourceCount: 89,
      },
      {
        id: 'web-development',
        name: 'Information Processing',
        icon: '�',
        description: 'Master office productivity and information management skills',
        lessonCount: 75,
        resourceCount: 170,
      },
    ],
  },
];
