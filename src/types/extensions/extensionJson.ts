export type ExtensionManifest = {
  name: string;
  id: string;
  description: string;
  version: Version;
  type: ExtensionType | ExtensionType[];
  main: string;
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
