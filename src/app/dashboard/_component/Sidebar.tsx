"use client";

import { useState } from "react";
import { Coins, Plus, Settings, Film, PanelLeftClose } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
// import UserCard from "./UserCard";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { menuItems } from "@/src/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-dvh bg-neutral-900 border-r border-white/10 flex flex-col justify-between p-4 transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="size-9 rounded-lg bg-[#1447e6] flex items-center justify-center shrink-0">
              <Film className="size-5 text-neutral-50" />
            </div>

            {!collapsed && (
              <span className="font-semibold text-neutral-50 text-lg whitespace-nowrap">
                Lumora AI
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
            className="text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800"
          >
            <PanelLeftClose
              className={cn(
                "size-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
          </Button>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors justify-start",
                  collapsed && "justify-center",
                  isActive
                    ? "bg-neutral-800 text-neutral-50"
                    : "text-[#a1a1a1] hover:bg-neutral-800/50 hover:text-neutral-50",
                )}
              >
                <Icon className="size-4 shrink-0" />

                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
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
