import { ExtensionInfo } from "@/types/extensionInfo";

export function GET() {
  const extensionDetail: ExtensionInfo = {
    name: "image",
    id: "clip-alchemist.image",
    version: "0.0.1",
    description: "Image support for Clip Alchemist",
    author: "Clip Alchemist",
    acceptMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    scripts: {
      serviceWorker: ["serviceWorker.mjs"],
    },
  };
  return Response.json(extensionDetail);
}
