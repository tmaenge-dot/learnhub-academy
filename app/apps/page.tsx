import Link from "next/link";

export default function AppsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mobile Apps</h1>
        
        {/* Shorthand App */}
        <div className="mb-12 p-8 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-start gap-6">
            <div className="text-6xl">✍️</div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Shorthand Simplified</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Master Pitman shorthand with our comprehensive mobile app. Features include:
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 dark:text-gray-400">
                <li>✓ Interactive stroke recognition</li>
                <li>✓ 45+ structured lessons</li>
                <li>✓ Practice exercises with feedback</li>
                <li>✓ Progress tracking</li>
                <li>✓ Offline access to all materials</li>
              </ul>
              <div className="flex gap-4">
                <Link
                  href="/apps/shorthand/download"
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Download APK
                </Link>
                <Link
                  href="/apps/shorthand"
                  className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Apps */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Mathematics", "Science Lab", "Language Learning", "Code Academy"].map((app) => (
              <div
                key={app}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg opacity-60"
              >
                <h3 className="text-xl font-semibold mb-2">{app}</h3>
                <p className="text-gray-600 dark:text-gray-400">In development...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
