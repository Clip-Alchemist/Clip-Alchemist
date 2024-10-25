import { colors, headerHeight, layerHeight, layerWidth } from ".";

export function renderLayoutNumbers({
  ctx,
  heightWidth,
  scrollX,
  scrollY,
}: {
  ctx: CanvasRenderingContext2D;
  heightWidth: number[];
  scrollX: number;
  scrollY: number;
}) {
  const visibleLayers = Math.ceil(heightWidth[0] / layerHeight);
  const startLayer = Math.floor(scrollY / layerHeight);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = `16px serif`;
  Array(visibleLayers)
    .fill(null)
    .map((_, i) => {
      const layerIndex = startLayer + i;
      const origin = [scrollX, headerHeight + layerHeight * layerIndex];
      ctx.fillStyle = colors.stripes[layerIndex % 2];
      ctx.fillRect(origin[0], origin[1], layerWidth, layerHeight);
      ctx.fillStyle = "black";
      ctx.fillText(
        `Layer${layerIndex + 1}`,
        origin[0] + layerWidth / 2,
        origin[1] + layerHeight / 2,
      );
    });
}
