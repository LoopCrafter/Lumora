import { task, metadata } from "@trigger.dev/sdk/v3";
import { GoogleGenAI } from "@google/genai";

interface GeneratePayload {
  imageBufferUrl?: string | null;
  style: "podcast" | "casual" | "3d" | "stylized";
  prompt?: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAvatarTask = task({
  id: "generate-avatar",
  maxDuration: 300,
  run: async (payload: GeneratePayload) => {
    await metadata.set("progress", 10);
    await metadata.set("status", "Initializing Gemini Engine...");

    let inlineData: any = undefined;
    if (payload.imageBufferUrl) {
      await metadata.set("progress", 25);
      await metadata.set("status", "Parsing reference asset configuration...");

      const response = await fetch(payload.imageBufferUrl);
      const arrayBuffer = await response.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");

      inlineData = {
        data: base64Data,
        mimeType: "image/jpeg",
      };
    }

    await metadata.set("progress", 50);
    await metadata.set(
      "status",
      `Engaging Nano Banana [Style: ${payload.style}]...`,
    );

    const enhancedPrompt = `Generate a high-fidelity ${payload.style} avatar style portrait. ${payload.prompt || ""}. Ensure pristine studio lighting profile settings.`;

    const modelInput: any = {
      model: "gemini-3-pro-image",
      prompt: enhancedPrompt,
      config: {
        aspectRatio: "1:1",
        outputMimeType: "image/jpeg",
      },
    };

    if (inlineData) {
      modelInput.contents = [
        {
          role: "user",
          parts: [{ inlineData }, { text: enhancedPrompt }],
        },
      ];
    }

    const aiResponse = await ai.models.generateImages(modelInput);

    await metadata.set("progress", 90);
    await metadata.set("status", "Finalizing asset compilation pipeline...");

    const generatedImageBlock = aiResponse.generatedImages?.[0];
    if (!generatedImageBlock || !generatedImageBlock.image?.imageBytes) {
      throw new Error(
        "Gemini Nano Banana failed to render valid image bytes back.",
      );
    }

    const resultUrl = `data:image/jpeg;base64,${generatedImageBlock.image.imageBytes}`;

    await metadata.set("progress", 100);
    await metadata.set("status", "Task completed successfully!");

    return {
      avatarUrl: resultUrl,
      style: payload.style,
    };
  },
});
