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
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center">
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
              Try Free
            </Link>

            <button
              onClick={handleCheckout}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold w-full"
            >
              Unlock Whale Alerts — $19/mo
            </button>

            <p className="text-sm text-gray-400">
              No trading. No custody. Public blockchain data only.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-gray-400 mb-10">
            Start free. Upgrade when you want more signal.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* FREE */}
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-gray-400 mb-4">Test the signal</p>
              <p className="text-3xl font-bold mb-6">$0</p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Track 1 wallet</li>
                <li>• Ethereum alerts only</li>
                <li>• Telegram notifications</li>
              </ul>
              <Link
                href="/dashboard"
                className="block bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold"
              >
                Start Free
              </Link>
            </div>

            {/* PRO (ANCHOR) */}
            <div className="border-2 border-blue-600 rounded-lg p-6 scale-105">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-blue-400 mb-4">Best Value</p>
              <p className="text-3xl font-bold mb-6">$19/mo</p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Track up to 10 wallets</li>
                <li>• Multi-chain alerts</li>
                <li>• Faster notifications</li>
              </ul>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold w-full"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* ELITE */}
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Elite</h3>
              <p className="text-gray-400 mb-4">For serious traders</p>
              <p className="text-3xl font-bold mb-6">$49/mo</p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>• Track up to 50 wallets</li>
                <li>• All supported chains</li>
                <li>• Advanced whale alerts</li>
              </ul>
              <button
                onClick={handleCheckout}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold w-full"
              >
                Go Elite
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
