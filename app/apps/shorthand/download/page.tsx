'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function ShorthandDownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-7xl mb-6">✍️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Download Shorthand Simplified
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with the ultimate Pitman shorthand learning app for Android
            </p>
          </motion.div>

          {/* Main Download Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-8 border-2 border-orange-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                📱
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Android App Bundle</h2>
                <p className="text-orange-600 font-semibold">Version 1.0.0 • Latest Release</p>
              </div>
            </div>

            {/* App Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                <div className="text-3xl mb-2">�</div>
                <div className="font-bold text-gray-800">42 Lessons</div>
                <div className="text-sm text-gray-600">Comprehensive curriculum</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                <div className="text-3xl mb-2">💾</div>
                <div className="font-bold text-gray-800">50 MB</div>
                <div className="text-sm text-gray-600">Compact file size</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                <div className="text-3xl mb-2">🤖</div>
                <div className="font-bold text-gray-800">Android 8.0+</div>
                <div className="text-sm text-gray-600">Compatible devices</div>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center mb-6">
              <a
                href="/downloads/shorthand-simplified.aab"
                className="inline-block px-12 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full hover:from-orange-700 hover:to-amber-700 transition-all text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105"
                download
              >
                ⬇️ Download App Bundle (.AAB)
              </a>
              <p className="text-sm text-gray-500 mt-3">Free • No Registration Required</p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">ℹ️</div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">About AAB Files</h4>
                  <p className="text-sm text-blue-800">
                    AAB (Android App Bundle) files need to be installed using tools like <strong>SAI (Split APKs Installer)</strong> or <strong>Bundletool</strong>. 
                    For easier installation, we recommend using the APK version (coming soon) or installing via Google Play Store (when available).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Installation Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
              <span className="text-3xl">📖</span>
              Installation Instructions
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Download AAB Installer</h4>
                  <p className="text-gray-600">Install <strong>SAI (Split APKs Installer)</strong> from Google Play Store or F-Droid</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Download the App Bundle</h4>
                  <p className="text-gray-600">Click the download button above to get the .AAB file</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Enable Unknown Sources</h4>
                  <p className="text-gray-600">Go to Settings → Security → Allow installation from unknown sources</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Install Using SAI</h4>
                  <p className="text-gray-600">Open SAI, select the downloaded .AAB file, and tap "Install"</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Start Learning!</h4>
                  <p className="text-gray-600">Open Shorthand Simplified and begin your journey to mastering Pitman shorthand</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Warning Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8"
          >
            <h4 className="font-bold mb-3 flex items-center gap-2 text-yellow-900">
              <span className="text-2xl">⚠️</span>
              <span>Important Security Notice</span>
            </h4>
            <p className="text-sm text-yellow-800 leading-relaxed">
              This app is distributed outside of the Google Play Store. Only download from trusted sources. 
              We are working on getting the app published on Google Play Store for easier and safer installation. 
              Always ensure you have adequate antivirus protection on your device.
            </p>
          </motion.div>

          {/* Alternative Download Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">Coming Soon 🚀</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 text-center opacity-60">
                <div className="text-5xl mb-3">📱</div>
                <h4 className="font-bold text-gray-800 mb-2">Google Play Store</h4>
                <p className="text-sm text-gray-600">Official store listing</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center opacity-60">
                <div className="text-5xl mb-3">🍎</div>
                <h4 className="font-bold text-gray-800 mb-2">iOS Version</h4>
                <p className="text-sm text-gray-600">Coming to App Store</p>
              </div>
            </div>
          </motion.div>

          {/* Back Link */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-lg transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
