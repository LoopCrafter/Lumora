import { task, metadata } from "@trigger.dev/sdk/v3";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import { avatars } from "@/db/schema";
import { getDb } from "@/db";
import { eq, and } from "drizzle-orm";
import Replicate from "replicate";

type AvatarStyle = "podcast" | "casual" | "3d" | "stylized";
type AspectRatio = "16:9" | "9:16";

interface GeneratePayload {
  avatarId: number;
  userId: string;
  imageBufferUrl?: string | null;
  style: AvatarStyle;
  prompt?: string;
  avatarName?: string;
}

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function buildPrompt(
  style: AvatarStyle,
  prompt: string | null | undefined,
  aspectRatio: AspectRatio,
): string {
  return [
    `Create a polished, highly-detailed AI avatar portrait tailored for a ${aspectRatio} composition layer.`,
    `Avatar artistic style target profile setting: ${style}.`,
    "Strictly use the uploaded visual input source as the primary facial identity, structure, and reference template.",
    "Keep the rendering clean, professional, creator-friendly, ultra-crisp, and perfectly suitable for profile presence.",
    "Ensure high aesthetic standards, detailed skin texture, organic facial highlights, and flawless shading mechanics.",
    "Avoid rendering any text, captions, signature marks, logos, watermarks, frame borders, extra background people, or distorted anatomy.",
    prompt ? `Customization engineering request payload: ${prompt}` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

// async function generateImage({
//   sourceImage,
//   style,
//   prompt,
//   aspectRatio,
// }: {
//   sourceImage: string;
//   style: AvatarStyle;
//   prompt: string | null | undefined;
//   aspectRatio: AspectRatio;
// }) {
//   const base64Parts = sourceImage.split(",");
//   const cleanBase64 = base64Parts.length > 1 ? base64Parts[1] : base64Parts[0];

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash-image",
//     contents: [
//       {
//         role: "user",
//         parts: [
//           {
//             inlineData: {
//               data: cleanBase64,
//               mimeType: "image/jpeg",
//             },
//           },
//           { text: buildPrompt(style, prompt, aspectRatio) },
//         ],
//       },
//     ],
//     config: {
//       responseModalities: ["IMAGE"],
//     },
//   });

//   const imagePart = response.candidates?.[0]?.content?.parts?.find(
//     (part: any) => "inlineData" in part && part.inlineData?.data,
//   );

//   if (!imagePart || !imagePart.inlineData?.data) {
//     throw new Error(
//       `Gemini Native Engine did not return a valid ${aspectRatio} avatar image byte buffer.`,
//     );
//   }

//   return {
//     data: imagePart.inlineData.data,
//     mimeType: imagePart.inlineData.mimeType ?? "image/jpeg",
//   };
// }

async function generateImage({
  sourceImage,
  style,
  prompt,
  aspectRatio,
}: {
  sourceImage: string;
  style: AvatarStyle;
  prompt: string | null | undefined;
  aspectRatio: AspectRatio;
}) {
  const basePrompt = buildPrompt(style, prompt, aspectRatio);

  // Explicitly tell the prompt the exact gender context to double-enforce boundaries
  const sexContext =
    basePrompt.toLowerCase().includes("woman") ||
    basePrompt.toLowerCase().includes("female")
      ? "portrait of a woman"
      : "portrait of a man";

  const finalPrompt = `${sexContext}, matching the facial features, gender, and expression of the reference image exactly. ${basePrompt}`;

  const output = await replicate.run(
    // Switched to a dedicated Image-to-Image workflow mapping for Flux Schnell
    "black-forest-labs/flux-schnell",
    {
      input: {
        prompt: finalPrompt,
        image: sourceImage, // The Base64 image payload is now actively processed by this model mapping layer
        strength: 0.65, // Controls variance (0.0 = identical to source, 1.0 = completely random text output)
        aspect_ratio: aspectRatio === "16:9" ? "16:9" : "9:16",
        output_format: "jpg",
        output_quality: 85,
        num_inference_steps: 4,
      },
    },
  );

  const rawUrl = Array.isArray(output) ? output[0] : output;
  if (!rawUrl) {
    throw new Error(
      `Replicate Flux Img2Img Engine did not return a valid ${aspectRatio} asset.`,
    );
  }

  const imageUrl = rawUrl.toString();

  const imageResponse = await fetch(imageUrl);
  const arrayBuffer = await imageResponse.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");

  return {
    data: base64Data,
    mimeType: "image/jpeg",
  };
}

async function uploadGeneratedImage({
  userId,
  avatarId,
  aspectRatio,
  image,
}: {
  userId: string;
  avatarId: number;
  aspectRatio: AspectRatio;
  image: { data: string; mimeType: string };
}) {
  const dataUri = `data:${image.mimeType};base64,${image.data}`;
  console.log("hamedhamedhamed2", userId);
  const uploadResponse = await cloudinary.uploader.upload(dataUri, {
    folder: "lumora-avatars",
    public_id: `user_${userId}_avatar_${avatarId}_${aspectRatio.replace(":", "-")}`,
    transformation: [
      {
        width: aspectRatio === "16:9" ? 1920 : 1080,
        height: aspectRatio === "16:9" ? 1080 : 1920,
        crop: "fill",
      },
    ],
  });

  return uploadResponse.secure_url;
}

async function updateAvatar(
  avatarId: number,
  userId: string,
  data: {
    status: string;
    image_9_16_url?: string;
    type?: string;
    name?: string;
  },
) {
  await getDb()
    .update(avatars)
    .set({
      status: data.status,
      src: data.image_9_16_url ?? "",
      image_9_16_url: data.image_9_16_url ?? "",
      type: data.type ?? "Custom",
      name: data.name,
    })
    .where(and(eq(avatars.id, avatarId), eq(avatars.userId, userId)));
}

async function setProgress(stage: string, percent: number, message: string) {
  await metadata.set("progress", percent);
  await metadata.set("status", message);
}

export const generateAvatarTask = task({
  id: "generate-avatar",
  maxDuration: 900,
  run: async (payload: GeneratePayload) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error(
          "Missing GEMINI_API_KEY configuration variable inside Trigger.dev settings scope.",
        );
      }

      if (!payload.imageBufferUrl) {
        throw new Error(
          "Missing source reference image bytes in pipeline payload.",
        );
      }

      await setProgress("queued", 5, "Avatar generation is queued.");

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

      await updateAvatar(payload.avatarId, payload.userId, {
        status: "generating",
        name: finalAvatarName,
        type: targetType,
      });

      await setProgress(
        "generating_16_9",
        35,
        "Generating the 16:9 landscape avatar version...",
      );

      await setProgress(
        "generating_9_16",
        60,
        "Generating the 9:16 portrait avatar version...",
      );
      const portrait = await generateImage({
        sourceImage: payload.imageBufferUrl,
        style: payload.style,
        prompt: payload.prompt,
        aspectRatio: "9:16",
      });

      await setProgress(
        "saving",
        85,
        "Saving generated avatar previews to Cloudinary...",
      );

      const image9x16Url = await uploadGeneratedImage({
        userId: payload.userId,
        avatarId: payload.avatarId,
        aspectRatio: "9:16",
        image: portrait,
      });

      await setProgress(
        "saving_db",
        95,
        "Saving asset records to Neon database...",
      );
      await updateAvatar(payload.avatarId, payload.userId, {
        status: "completed",
        image_9_16_url: image9x16Url,
        type: targetType,
        name: finalAvatarName,
      });

      await setProgress("completed", 100, "Your AI avatar is ready.");

      return {
        avatarId: payload.avatarId,
        image9x16Url,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Avatar generation failed.";
      await metadata.set("error", message);
      await setProgress("failed", 100, message);

      await updateAvatar(payload.avatarId, payload.userId, {
        status: "failed",
      });
      throw error;
    }
  },
});
