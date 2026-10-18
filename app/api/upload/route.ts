import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "node:stream";

export const runtime = "nodejs";

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MAX_TOTAL_SIZE = 500 * 1024 * 1024;

const ALLOWED_HOSTNAMES = new Set([
  "localhost",
  "angelika-i-patryk-wedding.vercel.app",
]);

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

async function verifyTurnstile(token: string, req: NextRequest) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || !token || token.length > 2048) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const remoteIp = req.headers.get("x-real-ip");

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      return false;
    }

    const result = await response.json();

    return (
      result.success === true &&
      ALLOWED_HOSTNAMES.has(result.hostname) &&
      result.action === "upload"
    );
  } catch {
    return false;
  }
}

function getGoogleDrive() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken || !FOLDER_ID) {
    throw new Error("Brakuje konfiguracji Google Drive.");
  }

  const auth = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "http://localhost:3000/api/auth/google/callback"
  );

  auth.setCredentials({
    refresh_token: refreshToken,
  });

  return google.drive({
    version: "v3",
    auth,
  });
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        {
          success: false,
          message: "Nieprawidłowy format przesyłania.",
        },
        { status: 415 }
      );
    }

    const formData = await req.formData();

    const token = formData.get("turnstileToken");

    if (typeof token !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Potwierdź weryfikację antybotową i spróbuj ponownie.",
        },
        { status: 403 }
      );
    }

    const verified = await verifyTurnstile(token, req);

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Weryfikacja nie powiodła się. Odśwież ją i spróbuj ponownie.",
        },
        { status: 403 }
      );
    }

    const entries = formData.getAll("file");

    if (entries.length !== 1 || !(entries[0] instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "Przesyłaj jeden plik w żądaniu.",
        },
        { status: 400 }
      );
    }

    const file = entries[0];

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Plik musi mieć rozmiar do 50 MB.",
        },
        { status: 413 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Ten format pliku nie jest obsługiwany.",
        },
        { status: 415 }
      );
    }

    if (file.size > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Przekroczono limit przesyłania.",
        },
        { status: 413 }
      );
    }

    const safeName =
      file.name
        .split(/[\\/]/)
        .pop()
        ?.replace(/[\u0000-\u001F\u007F]/g, "")
        .trim()
        .slice(0, 150) || "wedding-file";

    const buffer = Buffer.from(await file.arrayBuffer());
    const drive = getGoogleDrive();

    const uploaded = await drive.files.create({
      requestBody: {
        name: safeName,
        parents: [FOLDER_ID!],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: "id,name",
    });

    return NextResponse.json({
      success: true,
      file: {
        id: uploaded.data.id,
        name: uploaded.data.name,
      },
    });
  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error instanceof Error ? error.message : "Nieznany błąd"
    );

    return NextResponse.json(
      {
        success: false,
        message: "Nie udało się przesłać pliku. Spróbuj ponownie.",
      },
      { status: 500 }
    );
  }
}
