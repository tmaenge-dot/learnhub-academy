import Link from "next/link";
import { subjects } from "@/data/subjects";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Welcome to LearnHub Academy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Master multiple subjects with expert-designed courses. From shorthand to programming, 
          unlock your potential with quality education accessible anywhere, anytime.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#subjects"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Explore Courses
          </a>
          <a
            href="/apps"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold"
          >
            Download Apps
          </a>
        </div>
      </section>

      {/* Subject Cards */}
      <section id="subjects">
        <h2 className="text-3xl font-bold mb-2">Explore Our Subjects</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Choose from our diverse range of courses and start learning today</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/subjects/${subject.id}`}
                className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{subject.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {subject.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">
                    {subject.lessonCount} lessons
                  </span>
                <span className="text-sm text-secondary font-medium">
                  {subject.resourceCount} resources
                </span>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Mobile Apps</h2>
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Shorthand Simplified</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Learn Pitman shorthand on the go with our comprehensive mobile app. 
            Features interactive lessons, practice exercises, and recognition tools.
          </p>
          <div className="flex gap-4">
            <Link
              href="/apps/shorthand"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/apps/shorthand/download"
              className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Download APK
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
