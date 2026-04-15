import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { publicAssetUrl } from "./lib/publicAssetUrl";

/** Absolute favicon URL so it still resolves on client routes (./favicon breaks on /foo). */
function ensureFaviconLink(): void {
  const href = publicAssetUrl("favicon.ico");
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    document.head.prepend(link);
  }
  link.href = href;
}

ensureFaviconLink();

createRoot(document.getElementById("root")!).render(<App />);
