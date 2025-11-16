'use client'

import { signIn } from "next-auth/react"
import { FaGoogle, FaGithub } from "react-icons/fa"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-amber-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-sky-600 to-amber-600 bg-clip-text text-transparent">
          Welcome to LearnHub
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to track your progress and access premium content
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition font-medium"
          >
            <FaGoogle className="text-xl text-red-500" />
            Continue with Google
          </button>
          
          <button
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
          >
            <FaGithub className="text-xl" />
            Continue with GitHub
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
