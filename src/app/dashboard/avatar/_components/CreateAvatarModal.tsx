"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { X, Loader2, ImageIcon, UploadCloud } from "lucide-react";
import { StyleSelector } from "./StyleSelector";

interface CreateAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type AvatarStyle = "podcast" | "casual" | "3d" | "stylized";

export function CreateAvatarModal({ isOpen, onClose }: CreateAvatarModalProps) {
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>("podcast");
  const [prompt, setPrompt] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [publicToken, setPublicToken] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { run } = useRealtimeRun(activeRunId || "", {
    accessToken: publicToken || "dummy_token_to_prevent_error",
  });

  const taskProgress = run?.metadata?.progress as number | undefined;
  const taskStatusMessage = run?.metadata?.status as string | undefined;
  const isProcessing = run?.status === "QUEUED" || run?.status === "EXECUTING";
  const completedOutput =
    run?.status === "COMPLETED" ? (run.output as { avatarUrl: string }) : null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64File(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (isProcessing) return;
    fileInputRef.current?.click();
  };

  const handleGeneratePipeline = async () => {
    if (isProcessing) return;
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePreview: base64File,
          style: selectedStyle,
          prompt,
        }),
      });
      const data = await res.json();
      if (data.runId && data.publicAccessToken) {
        setPublicToken(data.publicAccessToken);
        setActiveRunId(data.runId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    if (isProcessing) return;
    setActiveRunId(null);
    setPublicToken(null);
    setImagePreview(null);
    setBase64File(null);
    setPrompt("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-full max-w-[850px] bg-neutral-900 border border-white/10 text-white rounded-3xl p-6 gap-6 shadow-2xl overflow-hidden md:max-w-[850px]">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold tracking-wide">
            Create New Avatar
          </DialogTitle>
        </DialogHeader>

        {isProcessing && (
          <div className="w-full bg-neutral-950/80 border border-white/5 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 min-h-[400px]">
            <Loader2 className="size-10 text-blue-500 animate-spin" />
            <span className="font-semibold text-base">
              Generating Avatar Assets
            </span>
            <span className="text-sm text-neutral-400">
              {taskStatusMessage || "Queueing Task..."}
            </span>
            <div className="w-full max-w-md bg-neutral-800 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-violet-500 h-full transition-all duration-300"
                style={{ width: `${taskProgress || 5}%` }}
              />
            </div>
          </div>
        )}

        {!isProcessing && completedOutput && (
          <div className="w-full bg-neutral-950/40 border border-white/5 p-6 rounded-2xl flex flex-col items-center gap-6 min-h-[400px] justify-center">
            <div className="relative size-48 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={completedOutput.avatarUrl}
                alt="Result"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={handleClose}
              className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl px-6 h-11 cursor-pointer"
            >
              Back to Gallery Workspace
            </button>
          </div>
        )}

        {!isProcessing && !completedOutput && (
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
                <span className="font-semibold text-sm">
                  Upload Avatar Image
                </span>
                <span className="text-xs text-neutral-400">
                  Click to browse — PNG, JPG up to 10MB
                </span>
              </div>
              <div className="flex gap-4 items-end flex-1 min-h-[220px]">
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full aspect-video bg-neutral-950/60 border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="16:9"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="size-5 text-neutral-500" />
                    )}
                  </div>
                  <span className="text-xs text-neutral-400">16:9 Preview</span>
                </div>
                <div className="w-[140px] flex flex-col items-center gap-2">
                  <div className="w-full aspect-[9/16] bg-neutral-950/60 border border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 text-neutral-500 relative overflow-hidden">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="9:16"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="size-5 text-neutral-500" />
                    )}
                  </div>
                  <span className="text-xs text-neutral-400">9:16 Preview</span>
                </div>
              </div>
            </div>
            <StyleSelector
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGeneratePipeline}
              onCancel={handleClose}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
