export type ExtensionInfo = {
  name: string;
  id: string;
  version: string;
  author: string;
  scripts?: {
    serviceWorker?: string[];
  };
};
export type EnabledExtensions = {
  [key: string]: ExtensionInfo | "Error";
};
