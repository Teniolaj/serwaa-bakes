import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";

const linkContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.06,
    },
  },
};

const linkItem = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

/** No stagger when user prefers reduced motion */
const linkContainerStatic = {
  hidden: {},
  visible: {},
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Menu", id: "menu" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  const panelTransition = reduceMotion
    ? { duration: 0.2 }
    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="flex min-w-0 items-center gap-2 sm:gap-3 shrink-0"
            >
              <BrandLogo decorative />
              <span className="font-serif text-lg sm:text-xl font-semibold italic tracking-tight text-accent truncate">
                Serwaa Bakes
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="text-foreground hover:text-accent transition-colors text-sm uppercase tracking-widest"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6"
              >
                Order Now
              </Button>
            </div>

            <motion.button
              type="button"
              className="md:hidden text-foreground hover:text-accent p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-dialog"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex"
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex"
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            id="mobile-nav-dialog"
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-100 flex md:hidden min-h-dvh flex-col bg-background pt-[env(safe-area-inset-top)] shadow-[0_0_60px_rgba(0,0,0,0.45)]"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { x: "100%", opacity: 1 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { x: 0, opacity: 1 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { x: "100%" }
            }
            transition={panelTransition}
          >
            <motion.div
              className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.05, duration: 0.3 }}
            >
              <a
                href="#home"
                className="flex min-w-0 items-center gap-3"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              >
                <BrandLogo compact decorative />
                <span className="font-serif text-lg font-semibold italic tracking-tight text-accent truncate">
                  Serwaa Bakes
                </span>
              </a>
              <motion.button
                type="button"
                className="text-foreground hover:text-accent p-2 -mr-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                whileTap={{ scale: 0.9 }}
              >
                <X size={28} />
              </motion.button>
            </motion.div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-8">
              <motion.div
                className="flex flex-col gap-1"
                variants={reduceMotion ? linkContainerStatic : linkContainer}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={reduceMotion ? linkContainerStatic : linkItem}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="text-left text-foreground hover:text-accent text-lg py-4 border-b border-border/80 w-full transition-colors"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  variants={reduceMotion ? linkContainerStatic : linkItem}
                  className="pt-2"
                >
                  <Button
                    type="button"
                    onClick={() => scrollToSection("contact")}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-full"
                  >
                    Order Now
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
