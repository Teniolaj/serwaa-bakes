import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-2xl font-script text-accent opacity-90 mb-6">
            Serwaa Bakes
          </div>

          <p className="text-muted-foreground/80 text-sm flex items-center justify-center gap-1.5 flex-wrap">
            &copy; 2026 Serwaa Bakes &middot; Women-Owned Business{" "}
            <Heart
              className="inline h-3.5 w-3.5 text-accent fill-accent/30"
              aria-hidden
            />
          </p>

          <div className="mt-8 flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          </div>
        </div>
      </div>
    </footer>
  );
}
