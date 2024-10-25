import { colors, headerHeight, layerWidth } from ".";

export function renderTimeLine({
  ctx,
  heightWidth,
  scrollX,
  scrollY,
  zoom,
  FPS,
}: {
  ctx: CanvasRenderingContext2D;
  heightWidth: any[];
  scrollX: number;
  scrollY: number;
  zoom: number;
  FPS: number;
}) {
  const origin = [scrollX + layerWidth, scrollY];
  ctx.fillStyle = colors.stripes[1];
  ctx.fillRect(origin[0], origin[1], heightWidth[1] - layerWidth, headerHeight);
  // 表示するフレーム数
  // TODO: 消えなくはなったけれどもだんだんと重くなるのでそれを修正する
  const timelineWidth = (scrollX + heightWidth[1] - layerWidth) / zoom; // Extend timeline width

  ctx.fillStyle = "black";
  ctx.font = `12px serif`;
  ctx.textAlign = "left";

  for (let i = 0; i <= timelineWidth; i++) {
    //  1フレーム分ごとにやっていく
    const x = layerWidth + i * zoom;
    const y = origin[1] + headerHeight;
    ctx.beginPath();
    if (i % FPS === 0) {
      ctx.moveTo(x, y - 12);
      const time = new Date((i / FPS) * 1000).toISOString().substr(14, 8);
      ctx.fillText(time, x, origin[1] + (headerHeight - 12) / 2);
    } else if (i % (FPS / 2) === 0) {
      ctx.moveTo(x, y - 8);
    } else if (i % (FPS / 10) == 0) {
      ctx.moveTo(x, y - 4);
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
