import { Home, Zap, User, Users, Mic, Library } from "lucide-react";

export const menuItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "AI Video Agent", href: "/dashboard/video-agent", icon: Zap },
  { label: "AI Video Avatar", href: "/dashboard/video-avatar", icon: User },
  { label: "Avatar", href: "/dashboard/avatar", icon: Users },
  { label: "AI Voice Cloning", href: "/dashboard/voice-cloning", icon: Mic },
  { label: "My Library", href: "/dashboard/library", icon: Library },
];
