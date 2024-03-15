import { ExtensionInfo } from "@/types/extensionInfo";

export function GET() {
  const extensionInfo: ExtensionInfo = {
    name: "basic",
    id: "clip-alchemist.basic",
    version: "0.0.1",
    description: "Basic extensions for Clip Alchemist",
    author: "Clip Alchemist",
    scripts: {
      serviceWorker: ["serviceWorker.js"],
    },
  };
  return Response.json(extensionInfo);
}
