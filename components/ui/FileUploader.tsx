"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  async function upload(files: FileList | null) {
    if (!files?.length) return;

    setLoading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();

        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Upload failed");
        }
      }

      alert("✅ Zdjęcia zostały przesłane!");
    } catch (err) {
      console.error(err);
      alert("❌ Wystąpił błąd.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => upload(e.target.files)}
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="group mt-10 inline-flex items-center gap-4 rounded-full bg-[#111111] px-9 py-5 text-sm font-medium uppercase tracking-[0.3em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#C8A97E] disabled:opacity-60"
      >
        <UploadCloud size={22} className="transition group-hover:rotate-12" />

        {loading ? "Przesyłanie..." : "Dodaj zdjęcia i filmy"}
      </button>
    </>
  );
}
