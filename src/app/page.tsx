"use client";

import { supabase } from "../lib/supabase";

export default function Home() {

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={login}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Login with Google
      </button>
    </div>
  );
}
