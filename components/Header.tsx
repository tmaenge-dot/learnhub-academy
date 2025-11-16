'use client'

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-orange-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent hover:scale-105 transition">
            🛠️ LearnHub Academy
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#courses" className="text-gray-700 hover:text-orange-600 transition-colors font-semibold">
              Courses
            </Link>
            <Link href="/apps" className="text-gray-700 hover:text-orange-600 transition-colors font-semibold">
              Apps
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-orange-600 transition-colors font-semibold">
              Pricing
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-orange-600 transition-colors font-semibold">
              Resources
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-gray-700 font-medium">Hi, {session.user?.name?.split(' ')[0]} 👋</span>
                <button 
                  onClick={() => signOut()}
                  className="px-6 py-2 text-orange-600 hover:text-orange-700 font-semibold transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => signIn()}
                  className="px-6 py-2 text-orange-600 hover:text-orange-700 font-semibold transition"
                >
                  Log In
                </button>
                <button 
                  onClick={() => signIn()}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full font-bold hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105 shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
