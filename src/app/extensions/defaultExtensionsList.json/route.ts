import { ExtensionsList } from "@/types/extensionsList";

export function GET() {
  const defaultExtensionsList: ExtensionsList = [
    {
      path: "basic",
      valid: true,
      version: "latest",
    },
  ];
  return Response.json(defaultExtensionsList);
}
