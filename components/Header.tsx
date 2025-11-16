import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            LearnHub Academy
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/subjects" className="hover:text-primary transition-colors">
              Subjects
            </Link>
            <Link href="/apps" className="hover:text-primary transition-colors">
              Apps
            </Link>
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-primary hover:text-primary/80 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
