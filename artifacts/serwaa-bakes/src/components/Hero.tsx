import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero-bg.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#100805]/85 via-[#100805]/65 to-[#100805] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#100805]/45 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <span className="text-accent font-script text-2xl md:text-3xl mb-4 block">
            Welcome to
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6 drop-shadow-lg px-2">
            Home of <br />
            <span className="italic font-light text-orange-100/95">
              Delectable Treats
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 tracking-wide font-light">
            North Legon, Agbogba &middot; Close to Wisconsin University
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            <Button
              onClick={scrollToMenu}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground px-4 py-3 text-lg transition-all"
            >
              View Menu
            </Button>

            <a
              href="https://wa.me/0554287120"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-3 text-lg font-medium transition-colors shadow-[0_0_22px_rgba(249,115,22,0.35)]"
            >
              Order on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-light">
          Discover
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-accent h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
