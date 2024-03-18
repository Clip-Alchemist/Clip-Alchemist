import { ExtensionsList } from "@/types/extensionsList";

export function GET() {
  const defaultExtensionsList: ExtensionsList = [
    {
      path: "basic",
      valid: true,
      version: "latest",
    },
    {
      path: "image",
      valid: true,
      version: "latest",
    },
    {
      path: "text",
      valid: true,
      version: "latest",
    },
  ];
  return Response.json(defaultExtensionsList);
}
