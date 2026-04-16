import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
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

function chunkRows<T>(items: T[], perRow: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) {
    rows.push(items.slice(i, i + perRow));
  }
  return rows;
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

  const gridRows = useMemo(() => chunkRows(filtered, 3), [filtered]);

  return (
    <section id="menu" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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
          className="flex flex-wrap justify-center gap-0 mb-10 border-b border-card-border max-w-3xl mx-auto"
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
                  "relative flex-1 min-w-[28%] sm:min-w-0 px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors",
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
            <div className="relative max-w-5xl mx-auto">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-linear-to-b from-background via-background/90 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-linear-to-t from-background via-background/90 to-transparent"
                aria-hidden
              />

              <div
                className="scrollbar-none overflow-y-auto overscroll-contain scroll-smooth rounded-xl border border-card-border/60 bg-card/20 px-2 py-2 sm:px-3 sm:py-3 [--menu-card-h:176px] sm:[--menu-card-h:196px] [max-height:calc(3*var(--menu-card-h)+2rem)]"
                tabIndex={0}
                role="region"
                aria-label={`${MENU_CATEGORIES.find((c) => c.id === category)?.label ?? "Menu"} — scroll for more`}
              >
                <div className="space-y-2 sm:space-y-2 pb-8">
                  {gridRows.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="grid grid-cols-3 gap-2 sm:gap-3 w-full"
                    >
                      {row.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setModalItem(item)}
                          className="group relative w-full h-[var(--menu-card-h)] overflow-hidden rounded-lg border border-card-border bg-card text-left shadow-md outline-none transition-[transform,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_8px_28px_rgba(249,115,22,0.12)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <img
                            src={item.imageSrc}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 bg-linear-to-t from-background/95 via-background/35 to-transparent pointer-events-none"
                            aria-hidden
                          />
                          <div className="absolute bottom-0 left-0 right-0 z-[1] flex flex-col items-start text-left p-2 sm:p-2.5 pt-8 sm:pt-10">
                            <p className="font-serif text-[10px] sm:text-xs text-foreground leading-snug line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                              {item.name}
                            </p>
                            <p className="text-accent font-serif font-semibold text-xs sm:text-sm mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
                              GH₵ {item.priceLabel}
                            </p>
                          </div>
                          <div
                            className="absolute inset-0 z-[2] flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-visible:pointer-events-auto"
                          >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 bg-background/85 text-foreground shadow-md backdrop-blur-sm pointer-events-none">
                              <Search className="h-4 w-4" strokeWidth={1.75} />
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground/90">
              scroll to see other menu items.
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
            className="inline-flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-secondary hover:border-accent/50 px-8 py-3 text-sm font-medium transition-all"
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
