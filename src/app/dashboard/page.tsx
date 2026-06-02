import { Bell, LayoutGrid, Mic, Search, User, Video, Zap } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

const DashboardPage = async () => {
  return (
    <div>
      <header className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-12 py-6 justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-2xl leading-8 tracking-tight text-white/70">
            Welcome back, Alex
          </h1>
          <p className="text-[#a1a1a1] text-sm leading-5">
            Create stunning videos with the power of AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-neutral-900 border-white/15 border-1 border-solid flex px-3 py-2 items-center gap-2">
            <Search className="size-4 text-[#a1a1a1]" />
            <span className="text-[#a1a1a1] text-sm leading-5">
              Search features...
            </span>
          </div>
          <Button className="text-[#a1a1a1]" size="icon" variant="ghost">
            <Bell className="size-5" />
          </Button>
        </div>
      </header>
      <div className="p-12 py-3 flex-1 overflow-auto">
        <div className="flex mb-4 items-center gap-2">
          <LayoutGrid className="size-4 text-[#a1a1a1]" />
          <span className="font-medium text-[#a1a1a1] text-sm leading-5">
            Explore Features
          </span>
        </div>

        {/* Changed to grid-cols-4 and grid-rows-2 to perfectly match the design layout */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-160">
          {/* 1. AI Video Agent (Left side: spans 2 columns and 2 rows) */}
          <div className="group relative col-span-2 row-span-2 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <video
              className="size-full object-cover absolute inset-0"
              src="/videos/ai-video-agent.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.4),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <Zap className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-neutral-50 text-xl leading-7">
                  AI Video Agent
                </h3>
                <p className="max-w-md text-neutral-50/80 text-sm leading-5">
                  Create guided video workflows with an intelligent on-screen
                  agent.
                </p>
              </div>
            </div>
          </div>

          {/* 2. AI Video Avatar (Middle-Right Top: 1 column, 1 row) */}
          <div className="group relative col-span-1 row-span-1 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <video
              className="size-full object-cover absolute inset-0"
              src="/videos/ai-video-avatar.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.35),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <Video className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-neutral-50 text-xl leading-7">
                  AI Video Avatar
                </h3>
                <p className="text-neutral-50/80 text-sm leading-5">
                  Generate lifelike presenter videos from a script or brief.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Avatar (Far Right Top: 1 column, 1 row) */}
          <div className="group relative col-span-1 row-span-1 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <video
              className="size-full object-cover absolute inset-0"
              src="/videos/avatar.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.35),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <User className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-neutral-50 text-xl leading-7">
                  Avatar
                </h3>
                <p className="text-neutral-50/80 text-sm leading-5">
                  Design and manage branded avatars for every campaign.
                </p>
              </div>
            </div>
          </div>

          {/* 4. AI Voice Cloning (Bottom Right: spans 2 columns, 1 row) */}
          <div className="group relative col-span-2 row-span-1 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <Image
              src="/images/voice-cloning.png"
              alt="voice cloning"
              width={1500}
              height={1000}
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.35),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <Mic className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-neutral-50 text-xl leading-7">
                  AI Voice Cloning
                </h3>
                <p className="text-neutral-50/80 text-sm leading-5">
                  Clone voices for polished narration and product content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
