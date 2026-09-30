import { NextResponse } from "next/server";

export async function GET() {
  const profile = {
    name: "Reikananta",
    role: "peserta bootcamp",
    favoriteTech: ["JavaScript", "Next.js"],
  };

  return NextResponse.json(profile);
} 