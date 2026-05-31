"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import {
  UploadCloud,
  Mic,
  Smile,
  Layers,
  Sparkles,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface CreateAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AvatarStyle = "podcast" | "casual" | "3d" | "stylized";

export function CreateAvatarModal({ isOpen, onClose }: CreateAvatarModalProps) {
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>("podcast");
  const [prompt, setPrompt] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-[850px] bg-neutral-900 border border-white/10 text-white rounded-3xl p-6 gap-6 shadow-2xl overflow-hidden md:max-w-[850px]">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold tracking-wide">
            Create New Avatar
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
          <div className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 h-[200px] border-neutral-700 bg-neutral-950/40 hover:border-neutral-500 transition-colors cursor-pointer"
            >
              <UploadCloud className="size-8 text-blue-400" />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm">
                  Upload Avatar Image
                </span>
                <span className="text-xs text-neutral-400 max-w-[240px] mx-auto leading-normal">
                  Drag & drop or click to browse — PNG, JPG up to 10MB
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-end flex-1 min-h-[220px]">
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full aspect-video bg-neutral-950/60 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 text-neutral-500 relative overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="16:9 Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-5" />
                  )}
                </div>
                <span className="text-xs text-neutral-400">16:9 Preview</span>
              </div>

              <div className="w-[140px] flex flex-col items-center gap-2">
                <div className="w-full aspect-[9/16] bg-neutral-950/60 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 text-neutral-500 relative overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="9:16 Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-5" />
                  )}
                </div>
                <span className="text-xs text-neutral-400">9:16 Preview</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Avatar Style
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedStyle("podcast")}
                  className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${
                    selectedStyle === "podcast"
                      ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600"
                      : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"
                  }`}
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
                  className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${
                    selectedStyle === "casual"
                      ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600"
                      : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"
                  }`}
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
                  className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${
                    selectedStyle === "3d"
                      ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600"
                      : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"
                  }`}
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
                  className={`p-3 rounded-xl flex flex-col text-left gap-1 border transition-all cursor-pointer ${
                    selectedStyle === "stylized"
                      ? "border-blue-600 bg-blue-600/10 ring-1 ring-blue-600"
                      : "border-white/10 bg-neutral-950/40 hover:bg-neutral-800/60"
                  }`}
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
                placeholder="Describe your avatar style, appearance, or mood... e.g. professional woman in a studio setting with soft lighting"
                className="bg-neutral-950/40 border border-white/10 rounded-xl text-sm p-3 text-white placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-blue-600 resize-none h-[140px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 border-t border-white/10 pt-4 w-full">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-xl py-5 font-medium gap-2 text-sm cursor-pointer shadow-lg shadow-blue-900/20">
            <Sparkles className="size-4" />
            Generate with AI
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-neutral-800 border-white/10 hover:bg-neutral-700 text-white rounded-xl py-5 font-medium gap-2 text-sm cursor-pointer"
          >
            <Upload className="size-4" />
            Upload as It Is
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
