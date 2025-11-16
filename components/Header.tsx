'use client'

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
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
            <Link href="/pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-gray-700">Hi, {session.user?.name?.split(' ')[0]}</span>
                <button 
                  onClick={() => signOut()}
                  className="px-4 py-2 text-primary hover:text-primary/80 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => signIn()}
                  className="px-4 py-2 text-primary hover:text-primary/80 transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => signIn()}
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-amber-500 text-white rounded-lg hover:from-sky-600 hover:to-amber-600 transition font-medium"
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
