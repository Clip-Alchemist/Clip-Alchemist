export type ExtensionManifest = {
  name: string;
  id: string;
  description: string;
  version: Version;
  type: ExtensionType | ExtensionType[];
  main: string;
  scripts?: {
    title: string;
    event: string;
    script: string;
  }[];
};
type Version = `${number}.${number}.${number}`;
type ExtensionType =
  | "renderer"
  | "theme"
  | "settings"
  | "FileManager"
  | "export"
  | "import"
  | "animation"
  | "asset";
