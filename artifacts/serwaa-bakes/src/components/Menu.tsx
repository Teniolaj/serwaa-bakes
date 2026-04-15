import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MENU_CATEGORIES,
  type MenuCatalogItem,
  type MenuCategory,
  menuCatalog,
} from "@/data/menuCatalog";
import { cn } from "@/lib/utils";

function getPanelVariants(reduce: boolean) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.2 : 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: reduce ? 0 : -10,
      transition: { duration: reduce ? 0.12 : 0.22 },
    },
  };
}

function siblingsFor(item: MenuCatalogItem): MenuCatalogItem[] {
  return menuCatalog
    .filter((i) => i.groupId === item.groupId)
    .sort((a, b) => a.sortValue - b.sortValue);
}

/** Static hero image above the gallery (`public/menu/pastery/`). */
const MENU_HERO_SRC = "/menu/pastery/box-9-cupcake-180-250.jpg";

export function Menu() {
  const [category, setCategory] = useState<MenuCategory>("cakes");
  const [modalItem, setModalItem] = useState<MenuCatalogItem | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      menuCatalog
        .filter((i) => i.category === category)
        .sort((a, b) => a.sortValue - b.sortValue),
    [category]
  );

  const modalSiblings = useMemo(
    () => (modalItem ? siblingsFor(modalItem) : []),
    [modalItem]
  );

  return (
    <section id="menu" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#211d1a] to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="text-accent font-script text-2xl mb-2 block">
            Our Menu
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-4">
            Made fresh.{" "}
            <br className="md:hidden" />
            <span className="italic font-light text-muted-foreground">
              Made with love.
            </span>
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-14 rounded-2xl overflow-hidden mx-auto max-w-4xl relative h-[300px] sm:h-[400px] md:h-[440px]"
        >
          <img
            src={MENU_HERO_SRC}
            alt="Box of 9 cupcakes"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Filter tabs */}
        <div
          className="flex justify-center gap-0 mb-10 border-b border-card-border max-w-md mx-auto"
          role="tablist"
          aria-label="Menu category"
        >
          {MENU_CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "relative flex-1 px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/90"
                )}
              >
                {c.label}
                {active ? (
                  <motion.span
                    layoutId="menu-tab-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={category}
            role="tabpanel"
            variants={getPanelVariants(!!reduceMotion)}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-7xl mx-auto"
          >
            <div className="relative">
              {/* Edge fades so the slider feels inset */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-14 bg-linear-to-r from-background via-background/80 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-14 bg-linear-to-l from-background via-background/80 to-transparent"
                aria-hidden
              />

              <Carousel
                key={category}
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2.5 sm:-ml-3 md:-ml-4 pb-1">
                  {filtered.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="pl-2.5 sm:pl-3 md:pl-4 basis-[72%] min-[380px]:basis-[64%] sm:basis-[46%] md:basis-[32%] lg:basis-[26%] xl:basis-[22%]"
                    >
                      <button
                        type="button"
                        onClick={() => setModalItem(item)}
                        className="group relative mx-auto w-full max-w-[min(82vw,240px)] aspect-[3/4] overflow-hidden rounded-xl border border-card-border bg-card text-left shadow-[0_12px_40px_rgba(0,0,0,0.35)] outline-none transition-[transform,box-shadow] duration-300 hover:border-accent/35 hover:shadow-[0_16px_48px_rgba(232,165,152,0.12)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:mx-0 sm:max-w-none sm:aspect-4/5"
                      >
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent opacity-90 md:opacity-82"
                          aria-hidden
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4">
                          <p className="font-serif text-sm md:text-base text-foreground leading-snug line-clamp-2 pr-1">
                            {item.name}
                          </p>
                          <p className="text-accent font-serif font-semibold text-base md:text-lg mt-1">
                            GH₵ {item.priceLabel}
                          </p>
                        </div>
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                          aria-hidden
                        >
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 bg-background/75 text-foreground shadow-lg backdrop-blur-sm">
                            <Search className="h-5 w-5" strokeWidth={1.75} />
                          </span>
                        </div>
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  variant="outline"
                  className={cn(
                    "h-10 w-10 rounded-full border-card-border bg-background/90 text-foreground shadow-md backdrop-blur-sm",
                    "left-0 sm:left-1 top-[42%] z-20 -translate-y-1/2",
                    "disabled:opacity-20"
                  )}
                />
                <CarouselNext
                  variant="outline"
                  className={cn(
                    "h-10 w-10 rounded-full border-card-border bg-background/90 text-foreground shadow-md backdrop-blur-sm",
                    "right-0 sm:right-1 top-[42%] z-20 -translate-y-1/2",
                    "disabled:opacity-20"
                  )}
                />
              </Carousel>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground/90 sm:hidden">
              Swipe sideways to browse
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground italic mb-6">
            Looking for custom cakes or event catering?
          </p>
          <a
            href="https://wa.me/0554287120"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#1a1714] border border-[#211d1a] text-foreground hover:bg-[#211d1a] hover:border-accent/50 px-8 py-3 text-sm font-medium transition-all"
          >
            Message us for custom orders
          </a>
        </div>
      </div>

      <Dialog
        open={modalItem !== null}
        onOpenChange={(open) => {
          if (!open) setModalItem(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[min(90vh,800px)] overflow-y-auto border-card-border bg-background p-0 gap-0 sm:rounded-xl">
          <DialogHeader className="px-6 pt-6 pb-2 text-left space-y-1">
            <DialogTitle className="font-serif text-2xl pr-8">
              {modalItem?.name ?? "Menu"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {modalSiblings.length > 1
                ? "More options in this range — tap an image for details."
                : "Product details"}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {modalSiblings.map((s) => (
                <div
                  key={s.id}
                  className="rounded-lg overflow-hidden border border-card-border bg-card shadow-sm"
                >
                  <div className="aspect-square relative bg-card">
                    <img
                      src={s.imageSrc}
                      alt={s.name}
                      className="absolute inset-0 h-full w-full object-contain object-center"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-sm font-medium text-foreground leading-snug line-clamp-3">
                      {s.name}
                    </p>
                    <p className="text-accent font-serif font-semibold text-sm">
                      GH₵ {s.priceLabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
