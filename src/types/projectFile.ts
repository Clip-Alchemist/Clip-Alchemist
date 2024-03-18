import { UUID } from "crypto";
import { extensionId, extensionName } from "./extension";
// projectName.clipalchemist
export type ProjectFile = {
  name?: string;
  settings?: {
    width: number;
    height: number;
    fps: number;
  };
  assets?: {
    id: UUID;
    path: string;
    type: string;
    name: string;
  }[];
  scenes?: {
    scripts: Script[];
  }[];
};
export type Script = {
  id: UUID;
  start: number; //in seconds
  length: number; //in seconds
  layer: number; //first layer is 0
  name?: string; //from extension
  position: {
    x: number;
    y: number;
  };
  extension: extensionId; //extension id
  extensionData: {
    [key: `${extensionName}.${string}`]: any; //extensionName.option
  };
};
