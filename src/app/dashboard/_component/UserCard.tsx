import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/src/lib/utils";

type UserCardProps = {
  collapsed: boolean;
};

const UserCard: React.FC<UserCardProps> = ({ collapsed }) => {
  const { user, isLoaded } = useUser();
  return (
    <div className="w-full relative">
      {isLoaded ? (
        collapsed ? (
          <div className="flex justify-center items-center py-2 animate-fade-in-quick">
            {/* Native Clerk UserButton acting as the Avatar trigger */}
            <div className="relative flex-shrink-0">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 rounded-xl border border-white/10 shadow-md transition-transform duration-200 hover:scale-105",
                    userButtonPopoverCard: " border border-white/10",
                  },
                }}
              />
              {/* Glowing online status dot overlaid cleanly on avatar corner */}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-sm pointer-events-none animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-2xl  border border-white/5 flex justify-between items-center gap-3 relative overflow-hidden transition-all duration-200 animate-fade-in-quick">
            {/* Outer Decorative Gradient Layer */}
            <div className="absolute inset-0 brand-gradient opacity-[0.01] pointer-events-none" />

            <div className="flex items-center justify-between gap-2.5 min-w-0 z-0 flex-1">
              {/* Name and Email details */}
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold  truncate leading-none">
                  {user?.fullName || "Verta Creator"}
                </span>
                <span className="text-[10px] text-muted-foreground truncate mt-1.5 leading-none">
                  {user?.primaryEmailAddress?.emailAddress ||
                    "creator@verta.ai"}
                </span>
              </div>
              {/* Native Clerk UserButton acting as the Avatar trigger */}
              <div className="relative flex-shrink-0">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-9 h-9 rounded-xl border border-white/10 shadow-md transition-transform duration-200 hover:scale-105",
                      userButtonPopoverCard:
                        "bg-zinc-900 border border-white/10",
                    },
                  }}
                />
                {/* Glowing online status dot overlaid cleanly on avatar corner */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-sm pointer-events-none" />
              </div>
            </div>
          </div>
        )
      ) : (
        <div
          className={cn(
            "p-3 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center justify-between transition-all",
            collapsed ? "justify-center p-3" : "gap-3",
          )}
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-800 animate-pulse border border-white/5 flex-shrink-0" />
          {!collapsed && (
            <div className="flex flex-col gap-1.5 flex-1 min-w-0 animate-fade-in-quick">
              <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
              <div className="h-2.5 w-28 bg-zinc-800 rounded animate-pulse" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
