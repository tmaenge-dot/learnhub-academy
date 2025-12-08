'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function InformationProcessingPage() {
  const features = [
    { icon: "💻", title: "Web Development Basics", description: "Learn HTML, CSS, JavaScript fundamentals" },
    { icon: "🔧", title: "Hands-on Projects", description: "Build real-world applications" },
    { icon: "🌐", title: "Real-world Applications", description: "Industry-standard practices" },
    { icon: "📚", title: "Industry-relevant Skills", description: "Stay current with tech trends" },
    { icon: "📊", title: "Database Management", description: "Learn SQL and data handling" },
    { icon: "🎨", title: "UI/UX Principles", description: "Create beautiful interfaces" },
    { icon: "🔒", title: "Web Security", description: "Understand security best practices" },
    { icon: "📱", title: "Responsive Design", description: "Build mobile-friendly websites" },
  ];

  const modules = [
    {
      title: "Module 1: Introduction to Web Development",
      topics: ["HTML basics", "CSS styling", "Web page structure", "Basic JavaScript"]
    },
    {
      title: "Module 2: Advanced Web Technologies",
      topics: ["JavaScript frameworks", "Database integration", "API development", "Version control"]
    },
    {
      title: "Module 3: Digital Information Management",
      topics: ["Data organization", "File systems", "Cloud storage", "Information security"]
    },
    {
      title: "Module 4: Project Development",
      topics: ["Planning & design", "Development workflow", "Testing & debugging", "Deployment"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <div className="text-7xl mb-6">💻</div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Information Processing
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto">
            Master Web Development & Digital Information Management
          </p>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Essential skills for IT and computer science students
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/apps/information-processing/download"
              className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110"
            >
              ⬇️ Download Now
            </Link>
            <a
              href="#features"
              className="px-10 py-4 bg-transparent border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-110"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Powerful Features 🚀
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to master web development and information processing
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
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300"
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

      {/* Curriculum Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Course Curriculum 📚
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive modules covering all aspects of web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {modules.map((module, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{module.title}</h3>
              <ul className="space-y-2">
                {module.topics.map((topic, topicIdx) => (
                  <li key={topicIdx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose This App */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto border-2 border-blue-200"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Why Choose Information Processing? 🌟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Industry-Focused</h3>
                <p className="text-gray-600">Learn skills that employers actually need</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Practical Projects</h3>
                <p className="text-gray-600">Build a portfolio while learning</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Mobile Learning</h3>
                <p className="text-gray-600">Study anytime, anywhere on your device</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🆓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Completely Free</h3>
                <p className="text-gray-600">All content accessible at no cost</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/apps/information-processing/download"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <span>⬇️</span>
              <span>Download Free App</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* App Info */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-lg mb-2">50+ Lessons</h3>
            <p className="text-gray-600 text-sm">Comprehensive curriculum</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-bold text-lg mb-2">4.7 Rating</h3>
            <p className="text-gray-600 text-sm">Highly rated by students</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-3">📥</div>
            <h3 className="font-bold text-lg mb-2">8K+ Downloads</h3>
            <p className="text-gray-600 text-sm">Join thousands of learners</p>
          </div>
        </div>
      </section>
    </div>
  );
}
