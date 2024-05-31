export type ExtensionJson = {
  name: string;
  id: string;
  description: string;
  version: Version;
  type: ExtensionType | ExtensionType[];
  scripts?: string[];
};
type Version = `${number}.${number}.${number}`;
type ExtensionType =
  | "renderer"
  | "theme"
  | "settings"
  | "export"
  | "import"
  | "animation"
  | "asset";
