'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaUsers, FaBook, FaChartLine, FaDownload } from "react-icons/fa"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeCourses: 10,
    totalLessons: 156,
    downloads: 342,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: FaUsers,
      color: "from-sky-500 to-blue-600",
      change: "+12% this month",
    },
    {
      title: "Active Courses",
      value: stats.activeCourses,
      icon: FaBook,
      color: "from-amber-500 to-orange-600",
      change: "2 new this week",
    },
    {
      title: "Total Lessons",
      value: stats.totalLessons,
      icon: FaChartLine,
      color: "from-emerald-500 to-green-600",
      change: "+8 this week",
    },
    {
      title: "App Downloads",
      value: stats.downloads,
      icon: FaDownload,
      color: "from-purple-500 to-pink-600",
      change: "+45 this week",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {session.user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-gray-600">Here's what's happening with LearnHub Academy</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="text-2xl text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-emerald-600">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: "New user registered", time: "2 hours ago" },
                { action: "Shorthand course completed", time: "5 hours ago" },
                { action: "Mathematics lesson viewed", time: "1 day ago" },
                { action: "App downloaded", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">{activity.action}</span>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Popular Subjects</h2>
            <div className="space-y-4">
              {[
                { name: "Shorthand", students: 423, progress: 85 },
                { name: "Programming", students: 356, progress: 72 },
                { name: "Mathematics", students: 298, progress: 68 },
                { name: "Science", students: 170, progress: 45 },
              ].map((subject) => (
                <div key={subject.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-sm text-gray-600">{subject.students} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-amber-500 h-2 rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
