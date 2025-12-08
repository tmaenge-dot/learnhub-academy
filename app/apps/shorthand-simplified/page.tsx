'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ShorthandSimplifiedPage() {
  const [selectedPayment, setSelectedPayment] = useState<'paypal' | 'mpesa' | 'card' | null>(null);

  const freeLessons = [
    {
      id: 1,
      title: "Lesson 1: Introduction",
      description: "Learn the basics of shorthand writing"
    },
    {
      id: 2,
      title: "Lesson 2: Basic Strokes",
      description: "Master fundamental stroke patterns"
    },
    {
      id: 3,
      title: "Lesson 3: Simple Words",
      description: "Practice writing common words"
    }
  ];

  const premiumFeatures = [
    { icon: "🤖", title: "Advanced AI", description: "AI-powered stroke analysis in real-time" },
    { icon: "♾️", title: "Access all 100+", description: "Access all 100+ lessons and exercises" },
    { icon: "📊", title: "Detailed tracking", description: "Detailed tracking and performance insights" },
    { icon: "🎯", title: "Real-time stroke analysis", description: "Get feedback when you need it" },
    { icon: "🍪", title: "Detailed progress dashboard", description: "Track your learning journey" }
  ];

  const allFeatures = [
    "Complete shorthand curriculum",
    "Practice drills for graphics",
    "New content added regularly",
    "Real-time stroke analysis",
    "Detailed progress dashboard",
    "Get help when you need it"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-12 px-4"
      >
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-4">✍️</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
            Shorthand Simplified
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Master modern shorthand with AI-powered learning
          </p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Free Lessons and Practice Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Basic Lessons Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Basic Lessons</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  FREE
                </span>
              </div>
              <ul className="space-y-2 mb-4 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>3 free introductory lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic stroke patterns</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Simple word practice</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors mb-4">
                Hide Lessons
              </button>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
                  <span>🎓</span>
                  <span>Free Lessons Available:</span>
                </div>
                <div className="space-y-3">
                  {freeLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href="/apps/shorthand-simplified/download"
                      className="block bg-white rounded-lg p-3 border border-green-100 hover:border-green-300 hover:shadow-md transition-all"
                    >
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{lesson.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{lesson.description}</p>
                      <span className="text-green-600 text-sm font-medium inline-flex items-center gap-1">
                        📱 Download App to Access →
                      </span>
                    </Link>
                  ))}
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-yellow-600">🔒</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-700">Lessons 4-100</p>
                      <p className="text-xs text-gray-500">Unlock with Premium</p>
                    </div>
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Practice Mode Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Practice Mode</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  FREE
                </span>
              </div>
              <ul className="space-y-2 mb-4 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Free practice exercises</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Stroke recognition</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                Practice Now (Free)
              </button>
            </div>
          </motion.div>
        </div>

        {/* Premium Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 md:p-10 border-2 border-blue-200"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-full text-sm mb-4 shadow-lg">
              <span>✨</span>
              <span>PREMIUM FEATURES</span>
              <span>✨</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
              Unlock Full Access
            </h2>
            <p className="text-lg text-gray-600">
              One-time payment • Lifetime access
            </p>
          </div>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {premiumFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="text-5xl font-extrabold text-blue-600 mb-2">$9.99</div>
            <p className="text-gray-600">One-time payment • No subscription</p>
          </div>

          {/* Payment Methods */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-center mb-4 text-gray-800">
              Choose Your Payment Method:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* PayPal */}
              <button
                onClick={() => setSelectedPayment('paypal')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPayment === 'paypal'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-lg text-2xl">
                    🇩🇪
                  </div>
                  <span className="text-sm font-medium text-gray-700">Secure payment via PayPal</span>
                </div>
              </button>

              {/* M-Pesa */}
              <button
                onClick={() => setSelectedPayment('mpesa')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPayment === 'mpesa'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-lg text-2xl">
                    📱
                  </div>
                  <span className="text-sm font-medium text-gray-700">M-Pesa, STK and Airtel</span>
                </div>
              </button>

              {/* Card Payment */}
              <button
                onClick={() => setSelectedPayment('card')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPayment === 'card'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-lg text-2xl">
                    💳
                  </div>
                  <span className="text-sm font-medium text-gray-700">Direct card payment</span>
                </div>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://paypal.me/YourPayPalUsername/9.99"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-center"
              >
                Pay with PayPal
              </a>
              <button 
                onClick={() => alert('Please contact support@engesdeliverables.com to set up mobile money payment for your country.')}
                className="py-3 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
              >
                Select Country
              </button>
              <a
                href="mailto:support@engesdeliverables.com?subject=Premium Payment Request&body=I would like to purchase Shorthand Simplified Premium for $9.99"
                className="py-3 px-6 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg text-center"
              >
                Request Details
              </a>
            </div>

            <div className="text-center mt-6">
              <Link href="/apps" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                ← Back
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
              <span>🔒</span>
              <span>Secure payment • 30-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>

        {/* All Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Premium Features Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {allFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-md">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Start Learning?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Download the app and start with free lessons today!
          </p>
          <Link
            href="/apps/shorthand-simplified/download"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <span>⬇️</span>
            <span>Download App (AAB)</span>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Android App Bundle • Compatible with Android 5.0+
          </p>
        </motion.div>
      </div>
    </div>
  );
}
