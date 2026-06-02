"use client";
import Image from "next/image";
import { AvatarData, CustomAvatar } from "@/src/types";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface AvatarCardProps {
  avatar: CustomAvatar;
  variant: "custom" | "default";
  // onEdit?: (id: string) => void;
  // onDelete?: (id: string) => void;
  // onSelect?: (id: string) => void;
}

export function AvatarCard({ avatar, variant }: AvatarCardProps) {
  const isCustom = variant === "custom";

  const handleEdit = (id: number) => console.log("Edit requested:", id);
  const handleDelete = (id: number) => console.log("Delete requested:", id);
  const handleSelect = (id: number) => console.log("Selected default:", id);
  const handleCreate = () => {};

  return (
    <Card className="rounded-2xl bg-neutral-900 border-white/10 border-0 border-solid p-4 gap-3 flex flex-col justify-between">
      <CardContent className="flex p-0 flex-col gap-3">
        {/* Next.js responsive container image box */}
        <div
          className={`relative w-full overflow-hidden rounded-xl bg-neutral-800 ${
            isCustom ? "aspect-square" : "aspect-[3/4]"
          }`}
        >
          <Image
            src={avatar.src}
            alt={avatar.src}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={isCustom} // Prioritize above-the-fold assets
          />
        </div>

        <div className="flex justify-between items-center w-full min-h-[24px]">
          <span className="font-medium text-white truncate">{avatar.name}</span>
          {isCustom ? (
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-medium text-xs leading-4">
              {avatar.type}
            </span>
          ) : (
            <span className="rounded-full bg-neutral-800 text-neutral-300 text-xs leading-4 px-2 py-0.5 whitespace-nowrap">
              {avatar.type}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-0 gap-2 w-full mt-auto">
        {isCustom ? (
          <>
            <Button
              onClick={() => handleEdit?.(avatar.id)}
              className="size-8 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              size="icon"
              variant="ghost"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              onClick={() => handleDelete?.(avatar.id)}
              className="size-8 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-red-950 hover:text-red-400"
              size="icon"
              variant="ghost"
            >
              <Trash2 className="size-4" />
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleSelect?.(avatar.id)}
            className="rounded-lg bg-neutral-800 text-white text-sm leading-5 w-full hover:bg-neutral-700"
          >
            Use This Avatar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
