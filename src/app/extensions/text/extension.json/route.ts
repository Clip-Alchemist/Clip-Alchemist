import { ExtensionInfo } from "@/types/extensionInfo";

export function GET() {
  const extensionInfo: ExtensionInfo = {
    name: "text",
    id: "clip-alchemist.text",
    version: "0.0.1",
    author: "Clip Alchemist",
    scriptOption: {
      text: {
        default: "",
        input: "text",
        id: "text.text",
        name: "Text",
      },
      font: {
        default: undefined,
        choices: "{font}",
        input: "font",
        id: "text.font",
        name: "Text Font",
      },
      fontSize: {
        default: 16,
        input: "number",
        id: "text.fontSize",
        name: "Font Size",
      },
      color: {
        default: "#000000",
        input: "color",
        id: "text.color",
        name: "Text Color",
      },
    },
  };
  return Response.json(extensionInfo);
}
