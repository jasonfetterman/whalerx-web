"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl text-center px-6">
        <h1 className="text-4xl font-bold mb-4">You’re Upgraded 🎉</h1>

        <p className="text-lg text-gray-300 mb-6">
          Your subscription is active. You can start tracking more whale
          wallets immediately.
        </p>

        <ol className="text-left text-gray-300 mb-8 space-y-2">
          <li>1. Open Telegram</li>
          <li>2. Go back to the WhalerX bot</li>
          <li>3. Add wallets — your new limits are unlocked</li>
        </ol>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold"
          >
            Go to Dashboard
          </Link>

          <p className="text-sm text-gray-400">
            Questions? You can manage your plan anytime from the dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}
