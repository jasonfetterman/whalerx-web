"use client";

import { useState } from "react";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

// OWNER OVERRIDE (keep this)
const OWNER_USER_ID = "user_39Q0doifW9P76mvt2fZ7nJTtq8S";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [linkCode, setLinkCode] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading…</p>
      </main>
    );
  }

  const plan =
    user?.id === OWNER_USER_ID
      ? "super_elite"
      : user?.publicMetadata?.plan || "free";

  const generateTelegramCode = async () => {
    setLoading(true);
    const res = await fetch("/api/telegram/link", { method: "POST" });
    const data = await res.json();
    setLinkCode(data.link_code);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <SignedIn>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <p className="mb-6 text-gray-300">
          Current plan:{" "}
          <span className="font-semibold uppercase text-yellow-400">
            {plan}
          </span>
        </p>

        {/* TELEGRAM LINKING */}
        <div className="border border-blue-700 p-6 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Connect Telegram</h2>

          {!linkCode && (
            <button
              onClick={generateTelegramCode}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold"
            >
              {loading ? "Generating…" : "Generate Telegram Code"}
            </button>
          )}

          {linkCode && (
            <div className="mt-4">
              <p className="mb-2 text-gray-300">
                Send this code to the Telegram bot:
              </p>
              <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded font-mono text-lg">
                {linkCode}
              </div>
            </div>
          )}
        </div>

        {plan === "super_elite" && (
          <div className="border border-yellow-500 p-6 rounded">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              👑 Super Elite Access
            </h2>
            <p>All features unlocked.</p>
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center min-h-screen">
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold">
              Sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}
