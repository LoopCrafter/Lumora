import { getDb } from "@/db";
import { avatars } from "@/db/schema";
import { generateAvatarTask } from "@/src/trigger/generate-avatar";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { imagePreview, style, prompt, userId } = await request.json();
    console.log("hamedhamedhamed", userId);

    const temporaryName = `Avatar #${Math.floor(100 + Math.random() * 900)}`;

    const styleLabels: Record<string, string> = {
      podcast: "Podcast",
      casual: "Casual",
      "3d": "3D Cartoon",
      stylized: "Stylized",
    };
    const targetType = styleLabels[style] || "Custom";

    const [newAvatar] = await getDb()
      .insert(avatars)
      .values({
        userId: userId,
        name: temporaryName,
        type: targetType,
        src: "",
        image_9_16_url: "",
        status: "pending",
        isCustom: true,
      })
      .returning({ id: avatars.id });

    if (!newAvatar?.id) {
      throw new Error("Failed to create initial avatar record in Neon DB");
    }

    const handle = await generateAvatarTask.trigger({
      imageBufferUrl: imagePreview,
      style,
      prompt,
      userId: userId,
      avatarId: newAvatar.id,
    });

    return NextResponse.json({
      runId: handle.id,
      publicAccessToken: handle.publicAccessToken,
      avatarId: newAvatar.id,
    });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch processing task" },
      { status: 500 },
    );
  }
}
