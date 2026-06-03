import { Plus } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { AvatarCard } from "./_components/AvatarCard";

import { CreateAvatarModal } from "./_components/CreateAvatarModal";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CustomAvatar } from "@/src/types";
import { DEFAULT_AVATARS } from "@/src/lib/constants";

export default async function AvatarsDashboard() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/avatars?userId=${userId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed fetching avatars raw status:", response.status);
    return (
      <div className="text-white p-8">
        Error loading avatar workspace assets.
      </div>
    );
  }

  const customAvatars: CustomAvatar[] = await response.json();
  console.log("hamed", customAvatars);

  return (
    <section className="overflow-y-auto bg-neutral-950 min-h-screen  p-4 md:p-8 flex-1">
      {/* Upper header action sector */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:items-center">
        <div className="flex flex-col gap-1 flex-1">
          <h1 className="font-bold text-white text-2xl leading-8">
            My Avatars
          </h1>
          <p className="text-neutral-400 text-sm">
            Manage and create your custom AI avatars
          </p>
        </div>
        <Link
          href="/dashboard/avatar?create=true"
          className={cn(
            buttonVariants(),
            "bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white gap-2 w-full sm:w-auto",
          )}
        >
          <Plus className="size-4" />
          Create New Avatar
        </Link>
      </div>

      {/* Custom Avatar Sector */}
      <section className="flex mt-8 flex-col gap-4">
        <h2 className="font-semibold text-white text-lg leading-7">
          My Custom Avatars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {customAvatars.map((avatar) => (
            <AvatarCard key={avatar.id} avatar={avatar} variant="custom" />
          ))}
          <Link
            href="/dashboard/avatar?create=true"
            className="transition-colors rounded-2xl bg-neutral-900/50 text-neutral-500 border-neutral-700 border-2 border-dashed flex p-4 min-h-[200px] flex-col justify-center items-center gap-2 hover:border-neutral-500 hover:text-neutral-300"
          >
            <Plus className="size-8" />
            <span className="font-medium text-sm leading-5">Add Avatar</span>
          </Link>
        </div>
      </section>

      <div className="bg-white/10 my-8 w-full h-px" />

      {/* Default Library Avatar Sector */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-white text-lg leading-7">
            Default Avatars
          </h2>
          <p className="text-neutral-400 text-sm">
            Choose from our library of pre-built avatars
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {DEFAULT_AVATARS.map((avatar) => (
            <AvatarCard key={avatar.id} avatar={avatar} variant="default" />
          ))}
        </div>
      </section>
      <CreateAvatarModal />
    </section>
  );
}
