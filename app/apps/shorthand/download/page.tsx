import Link from "next/link";

export default function ShorthandDownloadPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Download Shorthand Simplified</h1>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Android App (APK)</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Download the latest version of Shorthand Simplified for Android devices.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-lg">📱</span>
              <span>Android 8.0 or higher required</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">💾</span>
              <span>File size: ~50 MB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🔄</span>
              <span>Version: 1.0.0</span>
            </div>
          </div>

          <a
            href="/downloads/shorthand-simplified.aab"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
            download
          >
            Download APK
          </a>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Installation Instructions</h3>
          <ol className="space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Download the APK file by clicking the button above</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Open your device Settings → Security → Enable "Unknown Sources" or "Install Unknown Apps"</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Locate the downloaded APK file in your Downloads folder</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Tap the file and follow the on-screen prompts to install</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">5.</span>
              <span>Open the app and start learning!</span>
            </li>
          </ol>
        </div>

        <div className="border border-yellow-500 bg-yellow-500/10 p-6 rounded-lg">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <span>⚠️</span>
            <span>Important Note</span>
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This app is distributed outside of the Google Play Store. Make sure you trust the source 
            before installing. We recommend scanning the file with your antivirus software if you have concerns.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/apps" className="text-primary hover:underline">
            ← Back to Apps
          </Link>
        </div>
      </div>
    </div>
  );
}
