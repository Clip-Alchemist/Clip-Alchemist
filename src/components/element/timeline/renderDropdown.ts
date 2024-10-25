import { headerHeight, layerWidth } from ".";

export function renderDropdown({
  ctx,
  scrollX,
  scrollY,
}: {
  ctx: CanvasRenderingContext2D;
  scrollX: number;
  scrollY: number;
}) {
  ctx.fillStyle = "gray";
  ctx.fillRect(scrollX, scrollY, layerWidth, headerHeight);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `16px serif`;
  ctx.fillText("Root", scrollX + layerWidth / 2, scrollY + headerHeight / 2);
}
