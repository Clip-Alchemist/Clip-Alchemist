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
  media?: Media;
  scriptOption?: {
    [optionName: string]: {
      default: any;
      input: "text" | "number" | "checkbox" | "color" | "font";
      choices?: string | string[];
      id: `${extensionName}.${string}`;
      name?: string;
      placeholder?: string;
    };
  };
};
export type EnabledExtensions = {
  [key: extensionPath]: ExtensionInfo | "Error";
};
export type Media = {
  [key: string]: {
    name: string;
    backgroundColor: string;
    icon?: string;
  };
};
