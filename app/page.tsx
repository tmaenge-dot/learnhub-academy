'use client'

import Link from "next/link";
import { educationLevels } from "@/data/educationLevels";
import { motion } from "framer-motion";

export default function Home() {
  // Get only TVET courses
  const tvetLevel = educationLevels.find(level => level.id === 'tvet')!;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white py-20 px-4"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-7xl mb-6">🛠️</div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
              LearnHub Academy
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-bold max-w-3xl mx-auto">
              TVET & Vocational Skills Training
            </p>
            <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Master practical skills for real-world career success 🚀
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          >
            <a
              href="#courses"
              className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110 hover:bg-yellow-300"
            >
              🎯 Browse Courses
            </a>
            <Link
              href="/pricing"
              className="px-10 py-4 bg-transparent border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-110"
            >
              💎 View Pricing
            </Link>
          </motion.div>
          
          {/* Social Share Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12"
          >
            <p className="text-sm mb-4 opacity-90">🔥 Share with Friends:</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button className="px-6 py-2 bg-green-500 rounded-full font-semibold hover:bg-green-600 transition shadow-lg hover:scale-105">
                📱 WhatsApp
              </button>
              <button className="px-6 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:scale-105">
                📘 Facebook
              </button>
              <button className="px-6 py-2 bg-sky-400 rounded-full font-semibold hover:bg-sky-500 transition shadow-lg hover:scale-105">
                🐦 Twitter
              </button>
              <button className="px-6 py-2 bg-purple-500 rounded-full font-semibold hover:bg-purple-600 transition shadow-lg hover:scale-105">
                🔗 Copy Link
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* TVET Courses Section */}
      <section id="courses" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Our Vocational Courses 🎯
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Practical skills that employers are looking for
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tvetLevel.courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400"
            >
              <div className="text-6xl mb-4 text-center">{course.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-gray-800 text-center">
                {course.name}
              </h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed text-center min-h-[60px]">
                {course.description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-orange-200 text-xs">
                <span className="font-semibold text-orange-600 flex items-center gap-1">
                  📚 {course.lessonCount} lessons
                </span>
                <span className="font-semibold text-amber-600 flex items-center gap-1">
                  📖 {course.resourceCount} resources
                </span>
              </div>
              <div className="mt-4">
                <Link
                  href={`/subjects/${course.id}`}
                  className="block text-center px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Start Learning →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose TVET Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl p-10 shadow-xl border-2 border-orange-200"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Why Choose TVET? 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-5xl mb-4 text-center">💼</div>
              <h4 className="text-xl font-bold mb-2 text-center text-gray-800">Job-Ready Skills</h4>
              <p className="text-gray-600 text-center text-sm">
                Learn practical skills that employers value and get hired faster
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-5xl mb-4 text-center">⚡</div>
              <h4 className="text-xl font-bold mb-2 text-center text-gray-800">Quick Results</h4>
              <p className="text-gray-600 text-center text-sm">
                Short, focused courses that get you career-ready in weeks, not years
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="text-5xl mb-4 text-center">🎯</div>
              <h4 className="text-xl font-bold mb-2 text-center text-gray-800">Hands-On Learning</h4>
              <p className="text-gray-600 text-center text-sm">
                Real-world projects and practical exercises, not just theory
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Apps Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl my-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 text-gradient">📱 Mobile Apps</h2>
          <p className="text-xl text-gray-600">Learn on the go with our powerful mobile applications</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-purple-200"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">✍️</div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">Shorthand Simplified</h3>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">⭐ 4.8 Rating</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">📥 10K+ Downloads</span>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Master Pitman shorthand with our comprehensive mobile app! Features include interactive lessons, 
            practice exercises, stroke recognition, and real-time feedback. Perfect for students and professionals alike.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/apps/shorthand"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              📖 Learn More
            </Link>
            <Link
              href="/apps/shorthand/download"
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all hover:scale-105"
            >
              ⬇️ Download APK
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
