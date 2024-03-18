import { extensionId, extensionName, extensionPath } from "./extension";

export type ExtensionInfo = {
  name: extensionName;
  id: extensionId;
  version: `${number}.${number}.${number}`;
  author: string;
  description?: string;
  scripts?: {
    serviceWorker?: string[];
  };
  acceptMimeTypes?: MIMEType[];
  scriptOption?: {
    [optionName: string]: {
      default: any;
      type: "string" | "number" | "boolean";
      input: "text" | "number" | "checkbox" | "color" | "font";
      choices?: string | string[];
    };
  };
};
export type EnabledExtensions = {
  [key: extensionPath]: ExtensionInfo | "Error";
};
