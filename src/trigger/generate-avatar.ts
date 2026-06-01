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
    await metadata.set("status", "Initializing Free Gemini Engine...");

    let inlineData: any = undefined;
    if (payload.imageBufferUrl) {
      await metadata.set("progress", 25);
      await metadata.set("status", "Parsing reference image...");

      const base64Data = payload.imageBufferUrl.split(",")[1];

      inlineData = {
        data: base64Data,
        mimeType: "image/jpeg",
      };
    }

    await metadata.set("progress", 50);
    await metadata.set("status", "Generating native avatar image...");

    const enhancedPrompt = `Generate a high-fidelity ${payload.style} avatar style portrait. ${payload.prompt || ""}. Ensure pristine studio lighting profile settings.`;

    // فراخوانی قابلیت تولید عکسِ نیتیو بر روی مدل متنی رایگان
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash", // مدل چندرسانه‌ای کاملاً رایگان
      contents: inlineData
        ? [{ role: "user", parts: [{ inlineData }, { text: enhancedPrompt }] }]
        : enhancedPrompt,
      config: {
        // این بخش به مدل دستور می‌دهد که خروجی را به جای متن، به شکل عکس برگرداند
        responseModalities: ["IMAGE"],
      },
    });

    await metadata.set("progress", 90);
    await metadata.set("status", "Finalizing image compilation...");

    // استخراج بایت‌های تصویر تولید شده به صورت نیتیو
    const generatedPart = aiResponse.candidates?.[0]?.content?.parts?.[0];
    if (!generatedPart || !generatedPart.inlineData?.data) {
      throw new Error(
        "Gemini Native Image engine failed to return image data. Check prompt.",
      );
    }

    const resultUrl = `data:image/jpeg;base64,${generatedPart.inlineData.data}`;

    await metadata.set("progress", 100);
    await metadata.set("status", "Avatar generated successfully!");

    return {
      avatarUrl: resultUrl,
      style: payload.style,
    };
  },
});
