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
    id: UUID;
    path: string;
    type: string;
    name: string;
  }[];
  // scene 0 = root
  scenes?: {
    scripts: Script[];
  }[];
};
type Script = {
  id: UUID; //The ID of the script block.
  fileId?: UUID; //If using assets, the asset ID.
  start: number; //in seconds
  length: number; //in seconds
  layer: number; //first layer is 0
  name?: string; //Display name on timeline Entered by instructions from the extension
  "position.x": number;
  "position.y": number;
  extension: string; //extension id
  [key: `${string}.${string}`]: any; //extensionName.option
};
