import { getDb } from "@/db";
import { avatars } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing required userId parameter" },
        { status: 400 },
      );
    }

    const userCustomAvatars = await getDb()
      .select()
      .from(avatars)
      .where(and(eq(avatars.userId, userId), eq(avatars.isCustom, true)))
      .orderBy(desc(avatars.createdAt));

    return NextResponse.json(userCustomAvatars);
  } catch (error) {
    console.error("Failed to query user avatars layout:", error);
    return NextResponse.json(
      { error: "Internal Server Database Query Error" },
      { status: 500 },
    );
  }
}
