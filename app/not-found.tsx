'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to homepage after 3 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </p>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Redirecting you to home...
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full font-bold hover:from-orange-700 hover:to-amber-700 transition-all hover:scale-105 shadow-lg"
          >
            🏠 Go Home
          </Link>
          <Link
            href="/apps/shorthand"
            className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-full font-bold hover:bg-orange-50 transition-all hover:scale-105"
          >
            ✍️ Explore Shorthand
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-8">
          Auto-redirecting in 3 seconds...
        </p>
      </motion.div>
    </div>
  )
}
