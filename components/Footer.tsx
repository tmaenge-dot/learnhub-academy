import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LearnHub Academy
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering learners worldwide with quality education across multiple disciplines.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Subjects</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link href="/subjects/shorthand" className="hover:text-primary">Shorthand</Link></li>
              <li><Link href="/subjects/mathematics" className="hover:text-primary">Mathematics</Link></li>
              <li><Link href="/subjects/science" className="hover:text-primary">Science</Link></li>
              <li><Link href="/subjects/languages" className="hover:text-primary">Languages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link href="/apps" className="hover:text-primary">Mobile Apps</Link></li>
              <li><Link href="/resources" className="hover:text-primary">Study Materials</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/community" className="hover:text-primary">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} LearnHub Academy. Empowering minds through education.</p>
        </div>
      </div>
    </footer>
  );
}
