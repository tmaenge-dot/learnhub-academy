"use client";

import Link from "next/link";
import { useState } from "react";

export default function ShorthandSimplifiedPage() {
  const [showLessons, setShowLessons] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-5xl font-bold mb-4">Shorthand Simplified</h1>
          <p className="text-xl mb-6">
            Master modern shorthand with AI-powered learning
          </p>
        </div>
      </section>

      {/* Main Content - Free Features */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Basic Lessons - FREE */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Basic Lessons</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  FREE
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Introduction to shorthand</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic strokes and symbols</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>5 free practice exercises</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Simple word formation</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowLessons(!showLessons)}
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                {showLessons ? "Hide Lessons" : "Start Learning (Free)"}
              </button>
              
              {/* Free Lessons Content */}
              {showLessons && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="font-bold text-lg mb-3 text-green-900">📚 Free Lessons Available:</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900">Lesson 1: Introduction</h4>
                      <p className="text-sm text-gray-600">Learn the basics of shorthand writing</p>
                      <button className="mt-2 text-sm text-green-600 font-semibold hover:underline">
                        Start Lesson →
                      </button>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900">Lesson 2: Basic Strokes</h4>
                      <p className="text-sm text-gray-600">Master fundamental stroke patterns</p>
                      <button className="mt-2 text-sm text-green-600 font-semibold hover:underline">
                        Start Lesson →
                      </button>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-gray-900">Lesson 3: Simple Words</h4>
                      <p className="text-sm text-gray-600">Practice writing common words</p>
                      <button className="mt-2 text-sm text-green-600 font-semibold hover:underline">
                        Start Lesson →
                      </button>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg opacity-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-700">🔒 Lessons 4-100</h4>
                          <p className="text-sm text-gray-600">Unlock with Premium</p>
                        </div>
                        <span className="text-yellow-500 text-2xl">⭐</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Practice Mode - FREE */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Practice Mode</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  FREE
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Drawing canvas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic stroke recognition</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Limited practice sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Progress overview</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowPractice(!showPractice)}
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                {showPractice ? "Hide Practice" : "Practice Now (Free)"}
              </button>
              
              {/* Practice Canvas Content */}
              {showPractice && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="font-bold text-lg mb-3 text-green-900">✏️ Practice Canvas:</h3>
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-300 mb-4">
                    <div className="aspect-video bg-gray-50 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div className="text-4xl mb-2">✍️</div>
                        <p className="text-gray-600 font-semibold">Drawing Canvas</p>
                        <p className="text-sm text-gray-500">Free version - Basic strokes only</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold">
                      Clear Canvas
                    </button>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-semibold">
                      Check Stroke
                    </button>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-xl">⭐</span>
                      <div>
                        <p className="font-semibold text-yellow-900 text-sm">Unlock AI Recognition</p>
                        <p className="text-xs text-yellow-800">Get real-time AI feedback with Premium ($9.99)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Premium Features - LOCKED */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold mb-4">
                <span>⭐</span>
                <span>PREMIUM FEATURES</span>
                <span>⭐</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Unlock Full Access
              </h2>
              <p className="text-xl text-gray-700">
                One-time payment • Lifetime access
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* AI Recognition */}
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-bold text-lg mb-2">AI Recognition</h3>
                <p className="text-gray-600 text-sm">
                  Advanced AI analyzes your strokes in real-time
                </p>
              </div>

              {/* Unlimited Practice */}
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">♾️</div>
                <h3 className="font-bold text-lg mb-2">Unlimited Practice</h3>
                <p className="text-gray-600 text-sm">
                  Access all 100+ lessons and exercises
                </p>
              </div>

              {/* Analytics */}
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-bold text-lg mb-2">Progress Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Detailed tracking and performance insights
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-6 mb-6 inline-block">
                <div className="text-5xl font-bold text-cyan-600 mb-2">$9.99</div>
                <div className="text-gray-500">One-time payment • No subscription</div>
              </div>

              {/* PayPal Button */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_xclick" />
                <input type="hidden" name="business" value="tmaenge@gmail.com" />
                <input type="hidden" name="item_name" value="Shorthand Simplified - Premium Access" />
                <input type="hidden" name="item_number" value="SHORTHAND_SIMPLIFIED_V1" />
                <input type="hidden" name="amount" value="9.99" />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="hidden" name="return" value="https://tmaenge-dot.github.io/learnhub-academy/apps/shorthand-simplified?payment=success" />
                <input type="hidden" name="cancel_return" value="https://tmaenge-dot.github.io/learnhub-academy/apps/shorthand-simplified?payment=cancelled" />
                <button 
                  type="submit"
                  className="px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  � Unlock Premium - $9.99
                </button>
              </form>
              
              <p className="text-sm text-gray-500 mt-4">
                🔒 Secure payment powered by PayPal • 30-day money-back guarantee
              </p>
            </div>
          </div>

          {/* What You Get Section */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Premium Features Include
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-cyan-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">100+ Advanced Lessons</h4>
                  <p className="text-sm text-gray-600">Complete shorthand curriculum</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">AI-Powered Recognition</h4>
                  <p className="text-sm text-gray-600">Real-time stroke analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Unlimited Practice</h4>
                  <p className="text-sm text-gray-600">Practice anytime, anywhere</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Progress Tracking</h4>
                  <p className="text-sm text-gray-600">Detailed analytics dashboard</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Lifetime Updates</h4>
                  <p className="text-sm text-gray-600">New content added regularly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold">Priority Support</h4>
                  <p className="text-sm text-gray-600">Get help when you need it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Download for Android & Desktop
          </h2>
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-700 mb-6">
              Available on Android and Desktop platforms. Download the free trial or unlock premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/learnhub-academy/downloads/shorthand-simplified.aab"
                className="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-semibold"
                download
              >
                📥 Download Free Trial
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Android & Desktop • Version 1.0.0 • ~50 MB
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
