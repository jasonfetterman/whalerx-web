"use client";

import Link from "next/link";

export default function Home() {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Stripe checkout failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl text-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Real-Time Whale Wallet Alerts
        </h1>

        <p className="text-lg text-gray-300 mb-6">
          Track large on-chain movements and get instant Telegram alerts
          before the market reacts.
        </p>

        <ul className="text-left text-gray-300 mb-8 space-y-2">
          <li>• Monitor whale wallets automatically</li>
          <li>• Instant alerts on large transfers</li>
          <li>• No noise — just signals</li>
        </ul>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded text-lg font-semibold"
          >
            Go to Dashboard
          </Link>

          <button
            onClick={handleCheckout}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold w-full"
          >
            Upgrade to Pro ($19/mo)
          </button>
        </div>
      </div>
    </main>
  );
}
