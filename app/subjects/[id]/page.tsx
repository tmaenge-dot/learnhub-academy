import { subjects } from "@/data/subjects";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    id: subject.id,
  }));
}

export default async function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-6xl mb-4">{subject.icon}</div>
          <h1 className="text-4xl font-bold mb-4">{subject.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {subject.description}
          </p>
          <div className="flex gap-6 mt-6 text-sm">
            <span className="text-primary font-medium">
              📚 {subject.lessonCount} Lessons
            </span>
            <span className="text-secondary font-medium">
              📖 {subject.resourceCount} Resources
            </span>
          </div>
        </div>

        {/* Course Modules */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Course Modules</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((module) => (
              <div
                key={module}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">
                  Module {module}: Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive lessons and exercises for {subject.name}
                </p>
                <Link
                  href={`/subjects/${subject.id}/module/${module}`}
                  className="text-primary hover:underline"
                >
                  View Module →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-primary/10 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">📱 Mobile App</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Practice on the go
              </p>
              <Link href="/apps" className="text-primary hover:underline text-sm">
                Download →
              </Link>
            </div>
            <div className="p-6 bg-secondary/10 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">📄 Study Guides</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Downloadable PDFs
              </p>
              <Link href="/resources" className="text-secondary hover:underline text-sm">
                Browse →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
