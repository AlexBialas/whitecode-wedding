import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  // Autoryzacja dostępna tylko lokalnie podczas konfiguracji.
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Ta operacja jest dostępna tylko lokalnie." },
      { status: 403 }
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Brakuje danych OAuth w pliku .env.local." },
      { status: 500 }
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "http://localhost:3000/api/auth/google/callback"
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/drive"],
  });

  return NextResponse.redirect(url);
}
