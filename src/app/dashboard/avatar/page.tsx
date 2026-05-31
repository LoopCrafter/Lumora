"use client";

import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { CUSTOM_AVATARS, DEFAULT_AVATARS } from "@/src/lib/data/avatars";
import { AvatarCard } from "./_components/AvatarCard";
import { useState } from "react";
import { CreateAvatarModal } from "./_components/CreateAvatarModal";

export default function AvatarsDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string) => console.log("Edit requested:", id);
  const handleDelete = (id: string) => console.log("Delete requested:", id);
  const handleSelect = (id: string) => console.log("Selected default:", id);
  const handleCreate = () => {
    setIsModalOpen(true);
  };

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
        <Button
          onClick={handleCreate}
          className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white gap-2 w-full sm:w-auto"
        >
          <Plus className="size-4" />
          Create New Avatar
        </Button>
      </div>

      {/* Custom Avatar Sector */}
      <section className="flex mt-8 flex-col gap-4">
        <h2 className="font-semibold text-white text-lg leading-7">
          My Custom Avatars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CUSTOM_AVATARS.map((avatar) => (
            <AvatarCard
              key={avatar.id}
              avatar={avatar}
              variant="custom"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          <button
            onClick={handleCreate}
            className="transition-colors rounded-2xl bg-neutral-900/50 text-neutral-500 border-neutral-700 border-2 border-dashed flex p-4 min-h-[200px] flex-col justify-center items-center gap-2 hover:border-neutral-500 hover:text-neutral-300"
          >
            <Plus className="size-8" />
            <span className="font-medium text-sm leading-5">Add Avatar</span>
          </button>
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
            <AvatarCard
              key={avatar.id}
              avatar={avatar}
              variant="default"
              onSelect={handleSelect}
            />
          ))}
        </div>
      </section>
      <CreateAvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
