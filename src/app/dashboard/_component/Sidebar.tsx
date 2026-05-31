"use client";

import { useState } from "react";
import {
  Coins,
  Home,
  Library,
  Mic,
  Plus,
  Settings,
  Film,
  User,
  Users,
  Zap,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
// import UserCard from "./UserCard";
import { Button } from "@/src/components/ui/button";

export default function Sidebar() {
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="shrink-0 h-screen fixed left-0 top-0 bg-neutral-900 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex p-6 flex-col justify-between w-64 z-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-[#1447e6] flex justify-center items-center">
            <Film className="size-5 text-neutral-50" />
          </div>
          <span className="font-semibold text-neutral-50 text-lg leading-7 tracking-tight">
            Lumora AI
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          <Button
            className="bg-neutral-800 text-neutral-50 justify-start gap-2"
            variant="ghost"
          >
            <Home className="size-4" />
            Home
          </Button>
          <Button
            className="text-[#a1a1a1] justify-start gap-2"
            variant="ghost"
          >
            <Zap className="size-4" />
            AI Video Agent
          </Button>
          <Button
            className="text-[#a1a1a1] justify-start gap-2"
            variant="ghost"
          >
            <User className="size-4" />
            AI Video Avatar
          </Button>
          <Button
            className="text-[#a1a1a1] justify-start gap-2"
            variant="ghost"
          >
            <Users className="size-4" />
            Avatar
          </Button>
          <Button
            className="text-[#a1a1a1] justify-start gap-2"
            variant="ghost"
          >
            <Mic className="size-4" />
            AI Voice Cloning
          </Button>
          <Button
            className="text-[#a1a1a1] justify-start gap-2"
            variant="ghost"
          >
            <Library className="size-4" />
            My Library
          </Button>
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-xl bg-neutral-800/50 border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Coins className="size-4 text-[#fe9a00]" />
              <span className="font-medium text-neutral-50 text-sm leading-5">
                Credits
              </span>
            </div>
            <span className="font-semibold text-neutral-50 text-sm leading-5">
              2,450
            </span>
          </div>
          <div className="rounded-full bg-neutral-800 w-full h-1.5 overflow-hidden">
            <div className="w-[68%] rounded-full bg-neutral-200 h-full" />
          </div>
          <Button className="bg-neutral-300 hover:bg-neutral-200 text-neutral-900 gap-1.5 w-full h-8">
            <Plus className="size-3.5" />
            Buy Credits
          </Button>
        </div>
        <div className="rounded-xl border-white/10 border-1 border-solid flex p-2 justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="size-9">
              <AvatarImage
                alt="User"
                src="https://images.unsplash.com/photo-1706606999710-72658165a73d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80"
              />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-neutral-50 text-sm leading-5">
                Alex Kim
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4">Pro Plan</span>
            </div>
          </div>
          <Button className="size-8 text-[#a1a1a1]" size="icon" variant="ghost">
            <Settings className="size-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
