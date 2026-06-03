import { task, metadata } from "@trigger.dev/sdk/v3";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";
import { avatars } from "@/db/schema";
import { getDb } from "@/db";

interface GeneratePayload {
  imageBufferUrl?: string | null;
  style: "podcast" | "casual" | "3d" | "stylized";
  prompt?: string;
  avatarName?: string;
  userId: string;
}

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateAvatarTask = task({
  id: "generate-avatar",
  maxDuration: 300,
  run: async (payload: GeneratePayload) => {
    await metadata.set("progress", 10);
    await metadata.set("status", "Executing Image Generation Pipeline...");

    const styleLabels: Record<string, string> = {
      podcast: "Podcast",
      casual: "Casual",
      "3d": "3D Cartoon",
      stylized: "Stylized",
    };

    const targetType = styleLabels[payload.style] || "Custom";
    const finalAvatarName =
      payload.avatarName?.trim() ||
      `Avatar #${Math.floor(100 + Math.random() * 900)}`;
    const enhancedPrompt = `A high-fidelity corporate headshot portrait, ${payload.style} design style, ${payload.prompt || "highly detailed face, studio lighting, clean background"}`;

    const output = await replicate.run("black-forest-labs/flux-dev", {
      input: {
        prompt: enhancedPrompt,
        aspect_ratio: "1:1",
        output_format: "jpg",
        output_quality: 90,
        image: payload.imageBufferUrl || undefined,
      },
    });

    await metadata.set("progress", 60);
    await metadata.set("status", "Uploading Asset to Cloudinary Media CDN...");

    const rawUrl = Array.isArray(output) ? output[0] : output;
    if (!rawUrl) {
      throw new Error("Failed to generate image from Replicate backend.");
    }
    const imageUrl = rawUrl.toString();
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "lumora-avatars",
      transformation: [
        { width: 500, height: 500, crop: "fill", gravity: "face" },
      ],
    });

    await metadata.set("progress", 85);
    await metadata.set("status", "Saving Asset Records to Neon database...");

    const [insertedAvatar] = await getDb()
      .insert(avatars)
      .values({
        name: finalAvatarName,
        type: targetType,
        src: uploadResponse.secure_url,
        userId: payload.userId || "guest_user_fallback",
        isCustom: true,
      })
      .returning();

    await metadata.set("progress", 100);
    await metadata.set("status", "Pipeline completed successfully!");

    return {
      avatar: insertedAvatar,
    };
  },
});
