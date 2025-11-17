'use client'

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [apps, setApps] = useState([
    {
      id: 1,
      name: 'Shorthand (Pitman)',
      icon: '✍️',
      description: 'Master rapid writing with Pitman shorthand',
      url: 'https://tmaenge-dot.github.io/shorthand-tutor-app/',
      downloadUrl: '/apps/shorthand/download',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Information Processing',
      icon: '💻',
      description: 'Learn web development and digital skills',
      url: 'https://tmaenge-dot.github.io/information-processing-app/',
      downloadUrl: null,
      status: 'Active'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newApp, setNewApp] = useState({
    name: '',
    icon: '',
    description: '',
    url: '',
    downloadUrl: ''
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin")
    }
  }, [status, router])

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault()
    
    const app = {
      id: apps.length + 1,
      ...newApp,
      status: 'Active'
    }
    
    setApps([...apps, app])
    setNewApp({ name: '', icon: '', description: '', url: '', downloadUrl: '' })
    setShowAddForm(false)
    
    alert("App added successfully! (Note: This is demo functionality. In production, this would save to a database.)")
  }

  const handleDeleteApp = (id: number) => {
    if (confirm("Are you sure you want to delete this app?")) {
      setApps(apps.filter(app => app.id !== id))
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Logged in as: {session.user?.email}</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Apps</h3>
            <p className="text-3xl font-bold text-gray-900">{apps.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Apps</h3>
            <p className="text-3xl font-bold text-green-600">
              {apps.filter(app => app.status === 'Active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Downloads</h3>
            <p className="text-3xl font-bold text-gray-900">847</p>
          </div>
        </div>

        {/* Apps Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Manage Apps</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600"
            >
              {showAddForm ? 'Cancel' : '+ Add New App'}
            </button>
          </div>

          {/* Add App Form */}
          {showAddForm && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <form onSubmit={handleAddApp} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      App Name *
                    </label>
                    <input
                      type="text"
                      value={newApp.name}
                      onChange={(e) => setNewApp({...newApp, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Icon (Emoji)
                    </label>
                    <input
                      type="text"
                      value={newApp.icon}
                      onChange={(e) => setNewApp({...newApp, icon: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="📱"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newApp.description}
                    onChange={(e) => setNewApp({...newApp, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    App URL *
                  </label>
                  <input
                    type="url"
                    value={newApp.url}
                    onChange={(e) => setNewApp({...newApp, url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Download URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={newApp.downloadUrl}
                    onChange={(e) => setNewApp({...newApp, downloadUrl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="/apps/myapp/download"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                >
                  Add App
                </button>
              </form>
            </div>
          )}

          {/* Apps List */}
          <div className="p-6">
            <div className="space-y-4">
              {apps.map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{app.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-600">{app.description}</p>
                      <div className="flex gap-4 mt-2">
                        <a 
                          href={app.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-cyan-600 hover:underline"
                        >
                          View App →
                        </a>
                        {app.downloadUrl && (
                          <span className="text-sm text-gray-500">
                            Download available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
                      {app.status}
                    </span>
                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">📝 Setup Instructions:</h3>
          <p className="text-blue-800 text-sm mb-2">
            To enable Google login, you need to set up Google OAuth credentials:
          </p>
          <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
            <li>Go to <a href="https://console.cloud.google.com/" target="_blank" className="underline">Google Cloud Console</a></li>
            <li>Create a new project or select existing one</li>
            <li>Enable Google+ API</li>
            <li>Create OAuth 2.0 credentials</li>
            <li>Add authorized redirect URI: http://localhost:3001/api/auth/callback/google</li>
            <li>Create .env.local file with your credentials</li>
            <li>Update ADMIN_EMAIL in /app/api/auth/[...nextauth]/route.ts with your Gmail</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
