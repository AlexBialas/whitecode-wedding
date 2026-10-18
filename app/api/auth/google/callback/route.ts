import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // Ten endpoint służy wyłącznie do lokalnej konfiguracji.
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Operacja dostępna tylko lokalnie." },
      { status: 403 }
    );
  }

  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.json(
      { error: "Autoryzacja Google została anulowana lub nie powiodła się." },
      { status: 400 }
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Brakuje danych OAuth w .env.local." },
      { status: 500 }
    );
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      "http://localhost:3000/api/auth/google/callback"
    );

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return NextResponse.json(
        {
          error:
            "Brak refresh tokenu. Spróbuj ponownie przez /api/auth/google.",
        },
        { status: 400 }
      );
    }

    const envPath = path.join(process.cwd(), ".env.local");
    let envContent = await readFile(envPath, "utf8");

    const refreshTokenLine = `GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`;

    if (/^GOOGLE_REFRESH_TOKEN=.*$/m.test(envContent)) {
      envContent = envContent.replace(
        /^GOOGLE_REFRESH_TOKEN=.*$/m,
        refreshTokenLine
      );
    } else {
      envContent = `${envContent.trimEnd()}\n${refreshTokenLine}\n`;
    }

    await writeFile(envPath, envContent, { mode: 0o600 });

    return new NextResponse(
      "Autoryzacja Google zakończona! Refresh token zapisano w .env.local. Możesz zamknąć tę kartę.",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error(
      "Google OAuth callback error:",
      err instanceof Error ? err.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Nie udało się zakończyć autoryzacji Google." },
      { status: 500 }
    );
  }
}
