'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const apps = [
    {
      id: "shorthand",
      name: "Shorthand (Pitman)",
      icon: "✍️",
      description: "Master rapid writing with comprehensive Pitman shorthand lessons. Perfect for secretarial and office administration students.",
      rating: "4.8",
      downloads: "10K+",
      price: "Free",
      features: ["45+ Interactive lessons", "Practice exercises", "Progress tracking", "Offline access"],
      gradient: "from-orange-500 to-amber-600",
      link: "/apps/shorthand"
    },
    {
      id: "information-processing",
      name: "Information Processing",
      icon: "�",
      description: "Learn web development and digital information management skills. Essential for IT and computer science students.",
      rating: "4.7",
      downloads: "8K+",
      price: "Free",
      features: ["Web development basics", "Hands-on projects", "Real-world applications", "Industry-relevant skills"],
      gradient: "from-blue-500 to-indigo-600",
      link: "/apps/information-processing"
    },
    {
      id: "shorthand-simplified",
      name: "Shorthand Simplified",
      icon: "📝",
      description: "Master modern shorthand with AI-powered learning. Freemium model with free lessons and premium features.",
      rating: "4.9",
      downloads: "12K+",
      price: "$9.99",
      features: ["Free basic lessons", "Practice canvas", "AI recognition (Premium)", "100+ lessons (Premium)"],
      gradient: "from-cyan-500 to-blue-600",
      link: "/apps/shorthand-simplified"
    }
  ];

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
              🎓 Enge's Deliverables Academy
            </h1>
            <p className="text-xl md:text-2xl mb-4 font-medium max-w-3xl mx-auto">
              Free TVET Educational Apps for Students
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Professional mobile learning apps - Download, learn, and excel! 🚀
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
          >
            <Link
              href="#apps"
              className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110 hover:bg-yellow-300"
            >
              � Explore Apps
            </Link>
            <Link
              href="/apps"
              className="px-10 py-4 bg-transparent border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-110"
            >
              � All Downloads
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

      {/* Apps Section */}
      <section id="apps" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-gradient">
            📱 Our Mobile Apps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional educational apps designed for TVET students and professionals 🌟
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Link
                href={app.link}
                className="block h-full bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-300"
              >
                <div className="text-6xl mb-6 text-center">{app.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{app.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {app.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    ⭐ {app.rating}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    📥 {app.downloads}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {app.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-purple-600">
                    {app.price}
                  </span>
                  <span className={`inline-block px-4 py-2 bg-gradient-to-r ${app.gradient} text-white rounded-full text-sm font-semibold`}>
                    Learn More →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
