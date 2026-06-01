import { getDb } from "@/db";
import { avatars } from "@/db/schema";
import { generateAvatarTask } from "@/src/trigger/generate-avatar";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { imagePreview, style, prompt, userId } = await request.json();

    const handle = await generateAvatarTask.trigger({
      imageBufferUrl: imagePreview,
      style,
      prompt,
      userId: userId,
    });

    return NextResponse.json({
      runId: handle.id,
      publicAccessToken: handle.publicAccessToken,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to dispatch processing task" },
      { status: 500 },
    );
  }
}

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
