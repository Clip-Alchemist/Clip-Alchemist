import { colors, headerHeight, layerHeight, layerWidth, spacing } from ".";

export function renderMainContent({
  ctx,
  heightWidth,
  scrollX,
  scrollY,
  zoom,
  scripts,
  selected,
}: {
  ctx: CanvasRenderingContext2D;
  heightWidth: number[];
  scrollX: number;
  scrollY: number;
  zoom: number;
  scripts: { [s: string]: TimelineScript };
  selected: string[];
}) {
  const visibleLayers = Math.ceil(heightWidth[0] / layerHeight);
  const startLayer = Math.floor(scrollY / layerHeight);
  Array(visibleLayers)
    .fill(null)
    .map((_, i) => {
      const layerIndex = startLayer + i;
      ctx.fillStyle = colors.stripes[layerIndex % 2];
      ctx.fillRect(
        scrollX + layerWidth,
        headerHeight + layerHeight * layerIndex,
        heightWidth[1] - layerWidth,
        layerHeight,
      );
    });
  ctx.textAlign = "start";
  Object.entries(scripts).map(([id, script]) => {
    const isSelected = selected.find((s: string) => s == id);
    const origin = [
      layerWidth + script.start * zoom,
      headerHeight + layerHeight * script.layer,
    ];

    ctx.fillStyle = (script?.color?.background ?? colors.content.background)[
      isSelected ? colors.selected : colors.default
    ];
    ctx.beginPath();
    ctx.roundRect(
      origin[0],
      origin[1] + spacing[1],
      script.length * zoom,
      layerHeight - spacing[1] * 2,
      spacing[1],
    );
    ctx.fill();

    if (!script.name) return;
    ctx.fillStyle = script?.color?.text ?? colors.content.text;
    ctx.font = `16px serif`;
    ctx.fillText(
      script?.name,
      origin[0] + spacing[1],
      origin[1] + layerHeight / 2,
    );
  });
}
