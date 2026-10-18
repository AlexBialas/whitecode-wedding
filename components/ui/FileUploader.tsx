"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { UploadCloud, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";

const MAX_FILES = 50;
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_TOTAL_SIZE = 500 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

type UploadResult = {
  name: string;
  success: boolean;
  message?: string;
};

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const tokenResolver = useRef<((token: string) => void) | null>(null);
  const tokenRejecter = useRef<((error: Error) => void) | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [currentFile, setCurrentFile] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [captchaReady, setCaptchaReady] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function handleToken(token: string) {
    setTurnstileToken(token);
    setCaptchaReady(true);

    if (tokenResolver.current) {
      tokenResolver.current(token);
      tokenResolver.current = null;
      tokenRejecter.current = null;
    }
  }

  function handleCaptchaError() {
    setTurnstileToken("");
    setCaptchaReady(false);

    if (tokenRejecter.current) {
      tokenRejecter.current(
        new Error("Weryfikacja Cloudflare nie powiodła się.")
      );
      tokenResolver.current = null;
      tokenRejecter.current = null;
    }
  }

  function handleCaptchaExpire() {
    setTurnstileToken("");
    setCaptchaReady(false);
  }

  function getFreshToken(): Promise<string> {
    setTurnstileToken("");
    setCaptchaReady(false);

    return new Promise((resolve, reject) => {
      tokenResolver.current = resolve;
      tokenRejecter.current = reject;

      // Nowy widget uzyskuje nowy, jednorazowy token.
      setCaptchaKey((key) => key + 1);

      // Nie czekamy bez końca, jeśli Cloudflare nie odpowie.
      setTimeout(() => {
        if (tokenResolver.current === resolve) {
          tokenResolver.current = null;
          tokenRejecter.current = null;
          reject(new Error("Przekroczono czas weryfikacji. Spróbuj ponownie."));
        }
      }, 120_000);
    });
  }

  function selectFiles(selected: FileList | null) {
    if (!selected) return;

    const chosen = Array.from(selected);

    if (chosen.length > MAX_FILES) {
      alert(`Możesz wybrać maksymalnie ${MAX_FILES} plików.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const invalid = chosen.find(
      (file) =>
        file.size === 0 ||
        file.size > MAX_FILE_SIZE ||
        !ALLOWED_TYPES.has(file.type)
    );

    if (invalid) {
      alert(
        `Plik "${invalid.name}" jest pusty, ma ponad 50 MB lub ma nieobsługiwany format.`
      );
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const totalSize = chosen.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE) {
      alert("Łączny rozmiar plików nie może przekroczyć 500 MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setFiles(chosen);
    setResults([]);
    setCurrentFile(0);
  }

  async function uploadFiles() {
    if (!files.length || loading || !turnstileToken) return;

    setLoading(true);
    setResults([]);
    setCurrentFile(0);

    const completed: UploadResult[] = [];
    let nextToken = turnstileToken;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFile(i + 1);

      try {
        // Token jest jednorazowy. Dla kolejnych plików pobieramy nowy.
        if (i > 0) {
          nextToken = await getFreshToken();
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("turnstileToken", nextToken);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Nie udało się przesłać pliku.");
        }

        completed.push({
          name: file.name,
          success: true,
        });
      } catch (error) {
        completed.push({
          name: file.name,
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Nieznany błąd przesyłania.",
        });

        // Nie próbujemy wysyłać kolejnych plików, jeśli
        // weryfikacja Cloudflare przestała działać.
        if (
          error instanceof Error &&
          (error.message.includes("Cloudflare") ||
            error.message.includes("weryfikacji"))
        ) {
          for (let j = i + 1; j < files.length; j++) {
            completed.push({
              name: files[j].name,
              success: false,
              message: "Przerwano z powodu problemu z weryfikacją.",
            });
          }

          break;
        }
      }

      setResults([...completed]);
    }

    setLoading(false);
    setTurnstileToken("");
    setCaptchaReady(false);

    if (inputRef.current) inputRef.current.value = "";

    if (completed.every((result) => result.success)) {
      setFiles([]);
    }
  }

  const successful = results.filter((result) => result.success).length;
  const failed = results.filter((result) => !result.success).length;

  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">
      <input
        ref={inputRef}
        hidden
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(event) => selectFiles(event.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="group inline-flex items-center gap-4 rounded-full bg-[#111111] px-9 py-5 text-sm font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#C8A97E] disabled:opacity-60"
      >
        <UploadCloud size={22} className="transition group-hover:rotate-12" />
        {files.length
          ? `Wybrano ${files.length} plików`
          : "Wybierz zdjęcia i filmy"}
      </button>

      {files.length > 0 && (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-5 text-left">
          <p className="text-sm text-black/70">
            Wybrano <strong>{files.length}</strong> z {MAX_FILES} plików
          </p>

          <p className="mt-1 text-xs text-black/50">
            Łączny rozmiar:{" "}
            {(
              files.reduce((sum, file) => sum + file.size, 0) /
              (1024 * 1024)
            ).toFixed(1)}{" "}
            MB
          </p>

          <ul className="mt-4 max-h-40 space-y-2 overflow-y-auto text-sm">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}-${index}`}
                className="truncate text-black/70"
              >
                {file.name}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl border border-black/10 bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-black/70">
              <ShieldCheck size={18} />
              <span>Weryfikacja bezpieczeństwa</span>
            </div>

            {siteKey ? (
              <Turnstile
                key={captchaKey}
                siteKey={siteKey}
                options={{
                  action: "upload",
                  theme: "light",
                }}
                onSuccess={handleToken}
                onExpire={handleCaptchaExpire}
                onError={handleCaptchaError}
              />
            ) : (
              <p className="text-sm text-red-600">
                Brakuje Site Key w konfiguracji.
              </p>
            )}

            {captchaReady && (
              <p className="mt-2 text-xs text-green-700">
                Weryfikacja zakończona.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={uploadFiles}
            disabled={loading || !turnstileToken || !siteKey}
            className="mt-5 w-full rounded-full bg-[#C8A97E] px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#b39266] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? `Przesyłanie ${currentFile} z ${files.length}…`
              : `Prześlij ${files.length} plików`}
          </button>

          {loading && (
            <div
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/10"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={files.length}
              aria-valuenow={currentFile - 1}
            >
              <div
                className="h-full rounded-full bg-[#C8A97E] transition-all duration-300"
                style={{
                  width: `${((currentFile - 1) / files.length) * 100}%`,
                }}
              />
            </div>
          )}

          {!loading && results.length > 0 && (
            <p className="mt-4 text-sm">
              Wysłano: <strong>{successful}</strong>
              {failed > 0 && (
                <span className="text-red-600">
                  {" "}
                  · Niepowodzenia: <strong>{failed}</strong>
                </span>
              )}
            </p>
          )}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 space-y-2 text-left">
          {results
            .filter((result) => !result.success)
            .map((result, index) => (
              <div
                key={`${result.name}-${index}`}
                className="flex items-start gap-2 text-sm text-red-700"
              >
                <XCircle size={18} className="mt-0.5 shrink-0" />
                <span>
                  {result.name}: {result.message}
                </span>
              </div>
            ))}

          {!loading && failed === 0 && (
            <p className="flex items-center justify-center gap-2 text-sm text-green-700">
              <CheckCircle2 size={18} />
              Wszystkie pliki zostały przesłane!
            </p>
          )}
        </div>
      )}

      <p className="mt-5 text-xs leading-6 text-black/50">
        Maksymalnie 50 zdjęć lub filmów jednocześnie. Każdy plik do 50 MB,
        łącznie do 500 MB.
      </p>
    </div>
  );
}
