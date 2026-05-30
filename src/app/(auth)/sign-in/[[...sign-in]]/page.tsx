import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { Zap, Sparkles, Film, CheckCircle } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-hidden relative">
      {/* Decorative Blur Blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="animate-blob absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/10 blur-3xl opacity-60" />
        <div className="animate-blob animation-delay-4000 absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-blue/10 blur-3xl opacity-50" />
        <div className="dot-grid absolute inset-0 opacity-20" />
      </div>

      {/* Left Column */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-zinc-200/70 bg-gradient-to-br from-white via-zinc-50 to-zinc-100">
        {/* Soft background glow (much lighter + subtle) */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-200/30 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-3xl" />
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-zinc-900">
            Lumora
          </span>
        </Link>

        {/* Hero */}
        <div className="relative z-10 my-auto flex flex-col gap-8 max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-600 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              AI Video • Voice • Influencer Studio
            </div>

            <h2 className="text-4xl font-bold tracking-tight leading-tight text-zinc-900">
              Turn ideas into{" "}
              <span className="text-purple-600">AI-powered videos</span> in
              minutes.
            </h2>

            <p className="text-zinc-600 text-base leading-relaxed">
              Sign in to your Lumora workspace and create AI influencers, clone
              voices, and generate short-form videos from simple prompts.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center shadow-lg glow-purple-sm">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Lumora
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
