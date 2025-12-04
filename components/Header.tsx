import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-80 transition">
              <Logo size={60} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Enge's Deliverables Academy
              </h1>
              <p className="text-xs font-semibold text-gray-600 tracking-wide">
                Empowering TVET Excellence
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/apps" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Apps
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
