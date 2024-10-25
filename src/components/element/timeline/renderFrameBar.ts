import { headerHeight, layerWidth } from ".";

export function renderFrameBar({
  ctx,
  heightWidth,
  scrollY,
  zoom,
  frame,
}: {
  ctx: CanvasRenderingContext2D;
  heightWidth: any[];
  scrollY: number;
  zoom: number;
  frame: number;
}) {
  const x = frame * zoom + layerWidth;
  ctx.fillStyle = "red";
  ctx.fillRect(x - 0.5, scrollY + headerHeight / 2, 1, heightWidth[0]);
}
