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
          Track Crypto Whales in Real Time.
          <br />
          Get Alerts Before the Market Moves.
        </h1>

        <p className="text-lg text-gray-300 mb-6">
          WhalerX monitors large on-chain transactions and sends instant
          Telegram alerts so you can see what whales are doing as it happens.
        </p>

        <ul className="text-left text-gray-300 mb-8 space-y-2">
          <li>• Instant alerts on large wallet movements</li>
          <li>• Track whale wallets across major chains</li>
          <li>• Telegram-first — alerts where you already are</li>
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
            Unlock Whale Alerts — $19/mo
          </button>
        </div>
      </div>
    </main>
  );
}
