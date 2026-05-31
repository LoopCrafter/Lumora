"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { Mic, Smile, Layers, Sparkles, Upload } from "lucide-react";
import { AvatarStyle } from "./CreateAvatarModal";

interface StyleSelectorProps {
  selectedStyle: AvatarStyle;
  setSelectedStyle: Dispatch<SetStateAction<AvatarStyle>>;
  prompt: string;
  setPrompt: (val: string) => void;
  onGenerate: () => void;
  onCancel: () => void;
}

export function StyleSelector({
  selectedStyle,
  setSelectedStyle,
  prompt,
  setPrompt,
  onGenerate,
  onCancel,
}: StyleSelectorProps) {
  return (
    <div className="flex flex-col justify-between min-h-[460px]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Avatar Style
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedStyle("podcast")}
              className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${selectedStyle === "podcast" ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600" : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"}`}
            >
              <Mic
                className={`size-4 ${selectedStyle === "podcast" ? "text-blue-400" : "text-neutral-400"}`}
              />
              <span className="font-semibold text-sm mt-1">Podcast</span>
              <span className="text-xs text-neutral-400 leading-tight">
                Studio mic-ready look
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStyle("casual")}
              className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${selectedStyle === "casual" ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600" : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"}`}
            >
              <Smile
                className={`size-4 ${selectedStyle === "casual" ? "text-blue-400" : "text-neutral-400"}`}
              />
              <span className="font-semibold text-sm mt-1">Casual</span>
              <span className="text-xs text-neutral-400 leading-tight">
                Relaxed everyday vibe
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStyle("3d")}
              className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${selectedStyle === "3d" ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600" : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"}`}
            >
              <Layers
                className={`size-4 ${selectedStyle === "3d" ? "text-blue-400" : "text-neutral-400"}`}
              />
              <span className="font-semibold text-sm mt-1">3D Cartoon</span>
              <span className="text-xs text-neutral-400 leading-tight">
                Playful rendered style
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStyle("stylized")}
              className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${selectedStyle === "stylized" ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600" : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"}`}
            >
              <Sparkles
                className={`size-4 ${selectedStyle === "stylized" ? "text-blue-400" : "text-neutral-400"}`}
              />
              <span className="font-semibold text-sm mt-1">Stylized</span>
              <span className="text-xs text-neutral-400 leading-tight">
                Artistic creative flair
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Avatar Prompt (Optional)
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your avatar style, appearance, or mood..."
            className="bg-neutral-950/40 border border-white/10 rounded-xl text-sm p-3 text-white placeholder:text-neutral-500 resize-none h-[140px]"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 border-t border-white/10 pt-4 w-full mt-4">
        <Button
          onClick={onGenerate}
          className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl py-5 font-medium gap-2 text-sm cursor-pointer shadow-lg shadow-blue-900/20"
        >
          <Sparkles className="size-4" /> Generate with AI
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1 bg-neutral-800 border-white/10 hover:bg-neutral-700 text-white rounded-xl py-5 font-medium gap-2 text-sm cursor-pointer"
        >
          <Upload className="size-4" /> Upload as It Is
        </Button>
      </div>
    </div>
  );
}
