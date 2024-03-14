"use client";
export type ExtensionsList = {
  path: string; // path to extensions directory top (if it place is under "/public/extensions/", you can set under the path of "/public/extensions/")
  valid: boolean;
  version: "latest" | `${number}.${number}.${number}`;
}[];
