export type ExtensionInfo = {
  name: string;
  id: string;
  version: `${number}.${number}.${number}`;
  author: string;
  description?: string;
  scripts?: {
    serviceWorker?: string[];
  };
};
export type EnabledExtensions = {
  [key: string]: ExtensionInfo | "Error";
};
