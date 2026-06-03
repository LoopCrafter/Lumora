import { AvatarData, CustomAvatar } from "@/src/types";
import { Home, Zap, User, Users, Mic, Library } from "lucide-react";

export const menuItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "AI Video Agent", href: "/dashboard/video-agent", icon: Zap },
  { label: "AI Video Avatar", href: "/dashboard/video-avatar", icon: User },
  { label: "Avatar", href: "/dashboard/avatar", icon: Users },
  { label: "AI Voice Cloning", href: "/dashboard/voice-cloning", icon: Mic },
  { label: "My Library", href: "/dashboard/library", icon: Library },
];

export const DEFAULT_AVATARS: CustomAvatar[] = [
  {
    id: 1,
    name: "Adam",
    type: "Podcast",
    src: "/images/avatar/adam.png",
  },
  {
    id: 2,
    name: "Emma",
    type: "Casual",
    src: "/images/avatar/emma.png",
  },
  {
    id: 3,
    name: "Jack",
    type: "3D Cartoon",
    src: "/images/avatar/jack.png",
  },
  {
    id: 4,
    name: "Jen",
    type: "Stylized",
    src: "/images/avatar/jen.png",
  },
];
