export type File = {
  // video size
  size: {
    w: number;
    h: number;
  };
  frameRate: number;
  // first is root scene
  scene: {
    objects: {
      name: string;
      extensionId: string;
      // frame number
      start: number;
      end: number;
      detail: object;
      // start is 0 (shown Layer1)
      layer: number;
    }[];
  }[];
};
