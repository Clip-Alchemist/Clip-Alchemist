import { ExtensionInfo } from "@/types/extensionInfo";

export const commonOptions: ExtensionInfo["scriptOption"] = {
  start: {
    name: "start",
    id: "start" as `${string}.${string}`,
    input: "number",
    default: 0,
  },
  length: {
    name: "length",
    id: "length" as `${string}.${string}`,
    input: "number",
    default: 0,
  },
  "position.x": {
    name: "position",
    id: "position.x",
    input: "number",
    default: 0,
  },
  "position.y": {
    name: "position",
    id: "position.y",
    input: "number",
    default: 0,
  },
};