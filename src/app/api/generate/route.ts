import { generateAvatarTask } from "@/src/trigger/generate-avatar";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { imagePreview, style, prompt } = await request.json();

    const handle = await generateAvatarTask.trigger({
      imageBufferUrl: imagePreview,
      style,
      prompt,
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
