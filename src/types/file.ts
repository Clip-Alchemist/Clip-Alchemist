import { UUID } from "crypto";

export type File = {
  metadata: {
    title: string;
    fps: number; //int
    size: {
      width: number;
      height: number;
    };
    extensions?: string[]; // extensions id list
  };
  assets?: {
    [key: UUID]: {
      id: UUID;
      path: string;
      type: string;
      name: string;
    };
  };
  // scene 0 = root
  scenes?: {
    scripts: { [key: UUID]: Script };
  }[];
};
export type Script = {
  fileId?: UUID; //If using assets, the asset ID.
  start: number; //in flames
  length: number; //in flames
  layer: number; //first layer is 0
  name?: string; //Display name on timeline Entered by instructions from the extension
  "position.x": number;
  "position.y": number;
  extension: string; //extension id
  [key: `${string}.${string}`]: any; //extensionName.option
};

export const DEFAULT_FILE: File = {
  metadata: {
    title: "Untitled",
    fps: 60,
    size: {
      width: 1920,
      height: 1080,
    },
  },
};
