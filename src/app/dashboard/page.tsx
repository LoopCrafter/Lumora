import {
  ArrowRight,
  Bell,
  LayoutGrid,
  Library,
  Mic,
  Search,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

const DashboardPage = () => {
  return (
    <>
      <header className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-12 py-6 justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-2xl leading-8 tracking-tight">
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
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-160">
          <div className="group relative col-span-2 row-span-1 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <img
              alt="AI Video Agent"
              className="size-full object-cover transition-transform duration-500 absolute inset-0"
              src="/images/ai-video-agent.jpeg"
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.4),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <Zap className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <Badge className="bg-neutral-200 text-neutral-900 mb-1 w-fit">
                  Featured
                </Badge>
                <h3 className="font-semibold text-neutral-50 text-xl leading-7">
                  AI Video Agent
                </h3>
                <p className="max-w-md text-neutral-50/80 text-sm leading-5">
                  Describe your idea and let our autonomous agent generate a
                  complete, polished video from script to final cut.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative col-span-1 row-span-2 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <img
              alt="AI Video Avatar"
              className="size-full object-cover transition-transform duration-500 absolute inset-0"
              src="/images/ai-video-avatar.jpeg"
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.35),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <User className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-neutral-50 text-xl leading-7">
                  AI Video Avatar
                </h3>
                <p className="text-neutral-50/80 text-sm leading-5">
                  Turn lifelike digital presenters into your spokesperson.
                  Lip-synced, multilingual, ready in minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative col-span-1 row-span-1 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <img
              alt="Avatar"
              className="size-full object-cover transition-transform duration-500 absolute inset-0"
              src="/images/ai-avatar.jpeg"
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.35),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <Users className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-neutral-50 text-lg leading-7">
                  Avatar
                </h3>
                <p className="text-neutral-50/80 text-sm leading-5">
                  Design and customize your own unique digital persona.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative col-span-1 row-span-1 rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
            <img
              alt="AI Voice Cloning"
              className="size-full object-cover transition-transform duration-500 absolute inset-0"
              src="/images/ai-voice-cloning.jpeg"
            />
            <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.35),transparent)] absolute inset-0" />
            <div className="flex absolute inset-0 p-6 flex-col justify-between">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <Mic className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-neutral-50 text-lg leading-7">
                  AI Voice Cloning
                </h3>
                <p className="text-neutral-50/80 text-sm leading-5">
                  Clone any voice with stunning realism in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-6 items-center gap-2">
          <Library className="size-4 text-[#a1a1a1]" />
          <span className="font-medium text-[#a1a1a1] text-sm leading-5">
            My Library
          </span>
        </div>
        <div className="group relative rounded-2xl border-white/10 border-1 border-solid mt-4 h-32 overflow-hidden">
          <img
            alt="My Library"
            className="size-full object-cover transition-transform duration-500 absolute inset-0"
            src="/images/library.jpeg"
          />
          <div className="bg-[linear-gradient(to_right,oklch(0.145_0_0/0.95),oklch(0.145_0_0/0.5),transparent)] absolute inset-0" />
          <div className="flex absolute inset-0 p-6 justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="size-11 backdrop-blur-sm rounded-xl bg-neutral-950/30 flex justify-center items-center">
                <Library className="size-5 text-neutral-50" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-semibold text-neutral-50 text-lg leading-7">
                  My Library
                </h3>
                <p className="text-neutral-50/80 text-sm leading-5">
                  Access, manage and re-edit all your generated projects in one
                  place.
                </p>
              </div>
            </div>
            <Button className="bg-neutral-200 text-neutral-900 gap-1.5">
              Open
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
