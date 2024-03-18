import { ExtensionInfo } from "@/types/extensionInfo";

export function GET() {
  const extensionInfo: ExtensionInfo = {
    name: "text",
    id: "clip-alchemist.text",
    version: "0.0.1",
    author: "Clip Alchemist",
    scriptOption: {
      text: {
        default: "Hello, World!",
        type: "string",
        input: "text",
      },
      font: {
        default: undefined,
        type: "string",
        choices: "{font}",
        input: "font",
      },
      fontSize: {
        default: 16,
        type: "number",
        input: "number",
      },
      color: {
        default: "#000000",
        type: "string",
        input: "color",
      },
    },
  };
  return Response.json(extensionInfo);
}
