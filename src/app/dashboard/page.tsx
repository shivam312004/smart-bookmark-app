"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Bookmark = {
  id: string;
  url: string;
  title: string;
  user_id: string;
  created_at: string;
};

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // ➕ Add bookmark
  const addBookmark = async () => {
    if (!url || !title) return alert("Fill all fields");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not logged in");
      return;
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .insert([
        {
          url,
          title,
          user_id: user.id,
        },
      ])
      .select();

    console.log("INSERT DATA:", data);
    console.log("INSERT ERROR:", error);

    if (error) {
      alert("Insert failed. Check RLS policy.");
      return;
    }

    if (data) {
      setBookmarks((prev) => [data[0], ...prev]);
    }

    setUrl("");
    setTitle("");
  };

  // ❌ Delete bookmark
  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("FETCH ERROR:", error);
      }

      setBookmarks(data || []);
      setLoading(false);
    };

    initialize();
  }, []);

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Bookmarks</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          placeholder="Title"
          className="border p-2 flex-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="URL"
          className="border p-2 flex-1 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={addBookmark}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarks.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center border p-3 rounded mb-3"
          >
            <div>
              <p className="font-semibold">{b.title}</p>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm"
              >
                {b.url}
              </a>
            </div>
            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
