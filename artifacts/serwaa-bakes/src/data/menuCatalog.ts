import { parseMenuFilename } from "@/lib/parseMenuFilename";

export type MenuCategory = "cakes" | "pastery" | "daily_snacks";

export type MenuCatalogItem = {
  id: string;
  category: MenuCategory;
  imageSrc: string;
  name: string;
  priceLabel: string;
  sortValue: number;
  slug: string;
  groupId: string;
};

/** Paths under `public/menu/` — add new images here or match filenames to folder. */
const RAW: { path: string; category: MenuCategory }[] = [
  { path: "/menu/cakes/5-inch-vintage-cake-2-300.jpg", category: "cakes" },
  { path: "/menu/cakes/5-inch-bento-cake-5-cupcakes-300.jpg", category: "cakes" },
  { path: "/menu/cakes/birthday-package-3-230.jpg", category: "cakes" },
  { path: "/menu/cakes/6-inch-vintage-cake-300.jpg", category: "cakes" },
  { path: "/menu/cakes/6-inch-bride-cake-300.jpg", category: "cakes" },
  { path: "/menu/cakes/8-inch-1-layer-cake-320.jpg", category: "cakes" },
  { path: "/menu/cakes/6-inch-1-layer-cake-220.jpg", category: "cakes" },
  { path: "/menu/cakes/5-inch-bento-cake-2-cupcakes-200.jpg", category: "cakes" },
  { path: "/menu/cakes/birthday-cake-package-250.jpg", category: "cakes" },
  { path: "/menu/cakes/6-inch-1-layer-cake-300.jpg", category: "cakes" },
  { path: "/menu/cakes/Birthday-cake-package-270.jpg", category: "cakes" },
  { path: "/menu/cakes/5-inch-photoshoot-cake-170.jpg", category: "cakes" },
  { path: "/menu/cakes/6-inch-mini-vintage-cake-270.jpg", category: "cakes" },
  { path: "/menu/cakes/5-inch-bento-cake-150.jpg", category: "cakes" },
  { path: "/menu/cakes/6-inches-one-layer-cake-320.jpg", category: "cakes" },
  { path: "/menu/cakes/birthday-package-2-250.jpg", category: "cakes" },
  { path: "/menu/cakes/7-inch-1-layer-cake-270.jpg", category: "cakes" },
  { path: "/menu/cakes/5-inch-double-layer-bento-5-cupcakes-350.jpg", category: "cakes" },
  { path: "/menu/cakes/5-inch-vintage-cake-3-250.jpg", category: "cakes" },
  { path: "/menu/cakes/7-inch-double-layer-550.jpg", category: "cakes" },
  { path: "/menu/cakes/6-inch-graduation-cake-300.jpg", category: "cakes" },

  { path: "/menu/pastery/small-chops-pack-60.jpg", category: "pastery" },
  { path: "/menu/pastery/box-6-cupcake-160.jpg", category: "pastery" },
  { path: "/menu/pastery/box-9-cupcake-180-250.jpg", category: "pastery" },

  { path: "/menu/pastery/6-milky-donuts-100.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/4-milky-donuts-70.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/3-milky-donuts-2-50.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/pastry-package3-160.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/pastry-package-230.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/fried-spring-roll-samosa-5pcs-40.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/cake-in-cup-big-50.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/cake-in-tub-small-45.jpg", category: "daily_snacks" },
  { path: "/menu/pastery/cake-in-tub-big-65.jpg", category: "daily_snacks" },
];

function buildCatalog(): MenuCatalogItem[] {
  return RAW.map((r) => {
    const file = r.path.split("/").pop() ?? r.path;
    const parsed = parseMenuFilename(file);
    return {
      id: `${r.category}/${parsed.slug}`,
      category: r.category,
      imageSrc: r.path,
      name: parsed.name,
      priceLabel: parsed.priceLabel,
      sortValue: parsed.sortValue,
      slug: parsed.slug,
      groupId: `${r.category}/${parsed.groupId}`,
    };
  });
}

export const menuCatalog: MenuCatalogItem[] = buildCatalog();

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "cakes", label: "Cakes" },
  { id: "pastery", label: "Pastries" },
  { id: "daily_snacks", label: "Daily snacks" },
];
