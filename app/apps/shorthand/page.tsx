'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function ShorthandAppPage() {
  const features = [
    { icon: "📚", title: "42 Structured Lessons", description: "Complete curriculum from basics to advanced Pitman shorthand" },
    { icon: "✍️", title: "Interactive Practice", description: "Practice writing strokes with real-time feedback" },
    { icon: "🎯", title: "Progress Tracking", description: "Monitor your learning journey and achievements" },
    { icon: "📊", title: "Performance Analytics", description: "Detailed insights into your shorthand skills" },
    { icon: "🔄", title: "Spaced Repetition", description: "Smart review system for better retention" },
    { icon: "🏆", title: "Achievements & Badges", description: "Earn rewards as you master new skills" },
    { icon: "📱", title: "Offline Access", description: "Learn anywhere without internet connection" },
    { icon: "🎨", title: "Beautiful Interface", description: "Clean, modern design focused on learning" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <div className="text-7xl mb-6">✍️</div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Shorthand Simplified
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
            Master Pitman Shorthand with the Ultimate Mobile Learning App
          </p>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Professional note-taking skills for students, secretaries, and professionals
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/apps/shorthand/download"
              className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110"
            >
              ⬇️ Download Now
            </Link>
            <a
              href="#features"
              className="px-10 py-4 bg-transparent border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-110"
            >
              📖 Learn More
            </a>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Powerful Features 🚀
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to master Pitman shorthand efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-orange-100 hover:border-orange-300"
            >
              <div className="text-5xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto border-2 border-orange-200"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
            What You'll Learn 📖
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Basic Strokes & Symbols</h4>
                  <p className="text-sm text-gray-600">Master all fundamental shorthand characters</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Vowel Placement</h4>
                  <p className="text-sm text-gray-600">Learn proper vowel positioning techniques</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Consonant Blends</h4>
                  <p className="text-sm text-gray-600">Efficient writing of consonant combinations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Common Phrases</h4>
                  <p className="text-sm text-gray-600">Speed up your writing with phraseograms</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Abbreviations</h4>
                  <p className="text-sm text-gray-600">Professional shorthand abbreviations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Speed Building</h4>
                  <p className="text-sm text-gray-600">Techniques to increase writing speed</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Dictation Practice</h4>
                  <p className="text-sm text-gray-600">Real-world dictation exercises</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Professional Certification</h4>
                  <p className="text-sm text-gray-600">Prepare for official shorthand exams</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="text-4xl font-bold mb-2">42</div>
            <div className="text-sm opacity-90">Comprehensive Lessons</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="text-4xl font-bold mb-2">89</div>
            <div className="text-sm opacity-90">Learning Resources</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-sm opacity-90">Active Learners</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="text-4xl font-bold mb-2">4.8⭐</div>
            <div className="text-sm opacity-90">User Rating</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-3xl p-12 text-center shadow-2xl max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Master Shorthand? 🎯
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Download Shorthand Simplified now and start your journey to becoming a professional shorthand writer!
          </p>
          <Link
            href="/apps/shorthand/download"
            className="inline-block px-12 py-5 bg-white text-orange-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            ⬇️ Download Free App
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
