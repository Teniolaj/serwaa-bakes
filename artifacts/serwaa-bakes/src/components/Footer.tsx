import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0808] border-t border-[#1a1714] py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-2xl font-script text-accent opacity-70 mb-6">Serwaa Bakes</div>
          
          <p className="text-muted-foreground/70 text-sm flex items-center justify-center gap-1.5">
            &copy; 2025 Serwaa Bakes &middot; Women-Owned Business <span className="text-[#a855f7] inline-flex">💜</span>
          </p>
          
          <div className="mt-8 flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}