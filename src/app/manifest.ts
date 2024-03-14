import { MetadataRoute } from "next";
import { app } from "./meta.mjs";
import { isElectron } from "@/common/isElectron";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${app.title} (${isElectron() ? "Electron" : "PWA"})`,
    start_url: "/",
    icons: [
      {
        src: "/icon/icon480.webp",
        type: "image/webp",
        sizes: "480x480",
      },
    ],
    display: "standalone",
    display_override: ["window-controls-overlay"],
    theme_color: app.themeColor,
    background_color: app.themeColor,
  };
}
