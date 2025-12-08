'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function InformationProcessingDownloadPage() {
  const handleDownload = () => {
    // Trigger download - update with actual file path when available
    const link = document.createElement('a');
    link.href = '/downloads/information-processing.apk';
    link.download = 'information-processing.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">💻</div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Download Information Processing
            </h1>
            <p className="text-lg text-gray-600">
              Get the app and start learning web development today!
            </p>
          </div>

          {/* Download Button */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <button
              onClick={handleDownload}
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3"
            >
              <span className="text-3xl">⬇️</span>
              <div className="text-left">
                <div>Download APK File</div>
                <div className="text-sm font-normal opacity-90">Android Application</div>
              </div>
            </button>
            <p className="text-sm text-gray-500">
              File size: ~20 MB • Version 1.0.0
            </p>
          </div>

          {/* Installation Instructions */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>📱</span>
              <span>Installation Instructions</span>
            </h2>
            
            <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
              <li>Download the APK file to your Android device</li>
              <li>Open your device's Settings → Security</li>
              <li>Enable "Install from Unknown Sources" or "Allow from this source"</li>
              <li>Locate the downloaded APK file in your Downloads folder</li>
              <li>Tap the file and follow the installation prompts</li>
              <li>Once installed, you can disable "Unknown Sources" for security</li>
            </ol>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-bold">⚠️ Note:</span> You may need to grant installation permissions. 
                This is normal for apps downloaded outside the Google Play Store.
              </p>
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>⚙️</span>
              <span>System Requirements</span>
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Android 5.0 (Lollipop) or higher</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Minimum 100 MB free storage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Internet connection (for some features)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Recommended: 2GB RAM or more</span>
              </li>
            </ul>
          </div>

          {/* What's Included */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>📦</span>
              <span>What's Included</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">50+ comprehensive lessons</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Web development basics</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Hands-on projects</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Code examples & templates</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Progress tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">Offline access to content</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center border-t-2 border-gray-200 pt-8">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Having trouble with installation or the app?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apps/information-processing"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                ← Back to App Details
              </Link>
              <a
                href="mailto:support@engesdeliverables.com"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                📧 Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
