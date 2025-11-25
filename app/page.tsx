'use client'

import { subjects } from "@/data/subjects";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-24 px-4"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
              🎓 LearnHub Academy
            </h1>
            <p className="text-xl md:text-2xl mb-4 font-medium max-w-3xl mx-auto">
              Master Any Subject, Anytime, Anywhere
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              From shorthand to programming - unlock your potential with world-class education 🚀
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
          >
            <Link
              href="#subjects"
              className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110 hover:bg-yellow-300"
            >
              🛒 Explore Courses
            </Link>
            <Link
              href="/pricing"
              className="px-10 py-4 bg-transparent border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-110"
            >
              💎 View Pricing
            </Link>
          </motion.div>
          
          {/* Social Share Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16"
          >
            <p className="text-sm mb-4 opacity-90">🔥 Share with Friends:</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button className="px-6 py-2 bg-green-500 rounded-full font-semibold hover:bg-green-600 transition shadow-lg">
                📱 WhatsApp
              </button>
              <button className="px-6 py-2 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg">
                📘 Facebook
              </button>
              <button className="px-6 py-2 bg-sky-400 rounded-full font-semibold hover:bg-sky-500 transition shadow-lg">
                🐦 Twitter
              </button>
              <button className="px-6 py-2 bg-purple-500 rounded-full font-semibold hover:bg-purple-600 transition shadow-lg">
                🔗 Copy Link
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Subject Cards */}
      <section id="subjects" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-gradient">
            Explore Our Subjects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of courses and start your learning journey today 🌟
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/subjects/${subject.id}`}
                className="block h-full bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-300"
              >
                <div className="text-6xl mb-6 text-center">{subject.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{subject.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {subject.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                    📚 {subject.lessonCount} lessons
                  </span>
                  <span className="text-sm font-semibold text-purple-600 flex items-center gap-1">
                    📖 {subject.resourceCount} resources
                  </span>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition">
                    Start Learning →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
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
