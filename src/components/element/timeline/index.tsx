"use client";
import { File, Script } from "@/types/file";
import React, { useContext, useEffect, useRef, useState } from "react";
import colorPallet from "tailwindcss/colors";
import { FileContext } from "../main";
import { renderDropdown } from "./renderDropdown";
import { renderFrameBar } from "./renderFrameBar";
import { renderLayoutNumbers } from "./renderLayoutNumbers";
import { renderMainContent } from "./renderMainContent";
import { renderTimeLine } from "./renderTimeLine";
import { useResize } from "./useResize";

export const headerHeight = 30;
export const layerWidth = 70;
export const layerHeight = 40;

export const spacing = [2, 4, 8, 12, 16, 20, 24, 28]; // tailwindcssのpadding-nに相当(0はp-.5に相当)
export const colors = {
  stripes: [colorPallet.white, colorPallet.slate["200"]],
  content: {
    background: colorPallet.blue,
    text: colorPallet.white,
  },
  default: "700",
  selected: "400",
};

export default function Canvas({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<File>>;
}) {
  const file = useContext(FileContext);
  const FPS = file.metadata.fps;
  const scripts: { [key: string]: Script } = file?.scenes?.[0].scripts || {};
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heightWidth = useResize();
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [zoom, setZoom] = useState(2); // pixels per frame
  const [selected, setSelected] = useState<string[]>([]);
  const [frame, setFrame] = useState(60); //debug
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState([0, 0]);
  const [dragScriptId, setDragScriptId] = useState<string | null>(null);
  const [selectionBox, setSelectionBox] = useState<number[] | null>(null); // 選択範囲の座標
  const [scene, setScene] = useState(0); //現在編集中のシーン

  function setScripts(newScripts: { [key: string]: TimelineScript }) {
    setFile((prev) => ({
      ...prev,
      scenes: prev.scenes?.map((s, i) =>
        i === scene
          ? (() => {
              const { color, ...rest } = newScripts;
              return { scripts: rest };
            })()
          : s,
      ),
    }));
  }

  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("canvas要素の取得に失敗しました");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context取得失敗");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // スクロールを適用
    ctx.translate(-scrollX, -scrollY);

    renderMainContent({
      ctx,
      heightWidth,
      scrollX,
      scrollY,
      zoom,
      scripts,
      selected,
    });
    renderLayoutNumbers({ ctx, heightWidth, scrollX, scrollY });
    renderTimeLine({ ctx, heightWidth, scrollX, scrollY, zoom, FPS });
    renderFrameBar({ ctx, heightWidth, scrollY, zoom, frame });
    renderDropdown({ ctx, scrollX, scrollY });

    // 選択範囲を描画
    if (selectionBox) {
      const [startX, startY, width, height] = selectionBox;
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2; // 選択範囲の線の太さを調整
      ctx.strokeRect(startX, startY, width, height);
    }

    ctx.restore();
  }, [
    heightWidth,
    scrollX,
    scrollY,
    scripts,
    selected,
    frame,
    zoom,
    dragging,
    selectionBox,
    FPS,
  ]);

  const handleMouseDown = (e: any) => {
    const [canvasX, canvasY] = [
      e.nativeEvent.offsetX + scrollX,
      e.nativeEvent.offsetY + scrollY,
    ];
    let clickedScriptId = null;

    // Check if a script is clicked
    for (const [id, script] of Object.entries(scripts)) {
      const origin = [
        layerWidth + script.start * zoom,
        headerHeight + layerHeight * script.layer,
      ];
      if (
        canvasX >= origin[0] &&
        canvasX <= origin[0] + script.length * zoom &&
        canvasY >= origin[1] + spacing[1] &&
        canvasY <= origin[1] + layerHeight - spacing[1]
      ) {
        clickedScriptId = id;
        break; // Found a clicked script, stop searching
      }
    }

    if (clickedScriptId) {
      setDragging(true);
      setDragOffset([
        canvasX - (layerWidth + scripts[clickedScriptId].start * zoom),
        canvasY -
          (headerHeight +
            layerHeight * scripts[clickedScriptId].layer +
            spacing[1]),
      ]);
      setDragScriptId(clickedScriptId);

      // Ctrlキーが押されている場合は複数選択
      if (e.ctrlKey) {
        if (selected.includes(clickedScriptId)) {
          setSelected(selected.filter((id) => id !== clickedScriptId));
        } else {
          setSelected([...selected, clickedScriptId]);
        }
      } else {
        // Ctrlキーが押されていない場合は単一選択
        if (!selected.includes(clickedScriptId)) {
          setSelected([clickedScriptId]);
        }
      }
    } else {
      // 選択範囲の開始
      setDragging(true);
      setSelectionBox([canvasX, canvasY, 0, 0]);

      // 選択範囲外をクリックした場合は選択解除
      setSelected([]);
    }
  };

  const handleMouseMove = (e: any) => {
    const [canvasX, canvasY] = [
      e.nativeEvent.offsetX + scrollX,
      e.nativeEvent.offsetY + scrollY,
    ];

    if (dragging) {
      if (dragScriptId) {
        const newScripts = { ...scripts };
        const currentScript = newScripts[dragScriptId];

        let newStart = Math.max(
          0,
          (canvasX - dragOffset[0] - layerWidth) / zoom,
        );
        let newLayer = Math.max(
          0,
          Math.floor((canvasY - dragOffset[1] - headerHeight) / layerHeight),
        );

        // 当たり判定とスナップ
        let closestCollision = null;
        let collisionSide = null;

        for (const [id, script] of Object.entries(newScripts)) {
          if (id !== dragScriptId && newLayer === script.layer) {
            if (
              newStart < script.start + script.length &&
              newStart + currentScript.length > script.start
            ) {
              if (
                closestCollision === null ||
                Math.abs(script.start - (newStart + currentScript.length)) <
                  Math.abs(closestCollision.distance)
              ) {
                closestCollision = {
                  id: id,
                  distance: script.start - (newStart + currentScript.length),
                };
                collisionSide = "right";
              }
              if (
                closestCollision === null ||
                Math.abs(script.start + script.length - newStart) <
                  Math.abs(closestCollision.distance)
              ) {
                closestCollision = {
                  id: id,
                  distance: script.start + script.length - newStart,
                };
                collisionSide = "left";
              }
            }
          }
        }

        if (closestCollision) {
          const targetScript = newScripts[closestCollision.id];
          if (collisionSide === "left") {
            newStart = targetScript.start + targetScript.length;
          } else if (collisionSide === "right") {
            newStart = targetScript.start - currentScript.length;
          }
        }

        currentScript.start = newStart;
        currentScript.layer = newLayer;

        // 複数選択時の処理
        if (selected.length > 1) {
          const deltaStart = newStart - scripts[dragScriptId].start;
          const deltaLayer = newLayer - scripts[dragScriptId].layer;
          selected.forEach((id) => {
            if (id !== dragScriptId && newScripts[id]) {
              newScripts[id].start += deltaStart;
              newScripts[id].layer += deltaLayer;
            }
          });
        }

        setScripts(newScripts);
      } else if (selectionBox) {
        // 選択範囲の更新と選択状態の更新を同時に行う
        const [startX, startY] = selectionBox;
        const width = canvasX - startX;
        const height = canvasY - startY;
        setSelectionBox([startX, startY, width, height]);

        // マウス移動中に選択範囲に含まれるスクリプトを選択
        const selectedScripts = [];
        for (const [id, script] of Object.entries(scripts)) {
          const origin = [
            layerWidth + script.start * zoom,
            headerHeight + layerHeight * script.layer,
          ];
          const scriptRight = origin[0] + script.length * zoom;
          const scriptBottom = origin[1] + layerHeight;

          const selBoxRight = startX + width;
          const selBoxBottom = startY + height;

          if (
            ((startX < scriptRight && selBoxRight > origin[0]) ||
              (startX > scriptRight && selBoxRight < origin[0])) &&
            ((startY < scriptBottom && selBoxBottom > origin[1]) ||
              (startY > scriptBottom && selBoxBottom < origin[1]))
          ) {
            selectedScripts.push(id);
          }
        }
        setSelected(selectedScripts);
      }
    }
  };

  const handleMouseUp = (e: any) => {
    setDragging(false);
    setDragScriptId(null);
    setDragOffset([0, 0]);

    if (selectionBox) {
      const [startX, startY, width, height] = selectionBox;
      const selectedScripts = [];

      for (const [id, script] of Object.entries(scripts)) {
        const origin = [
          layerWidth + script.start * zoom,
          headerHeight + layerHeight * script.layer,
        ];
        const scriptRight = origin[0] + script.length * zoom;
        const scriptBottom = origin[1] + layerHeight;

        const selBoxRight = startX + width;
        const selBoxBottom = startY + height;

        // Check for overlap between selection box and script, handle negative width/height
        if (
          ((startX < scriptRight && selBoxRight > origin[0]) ||
            (startX > scriptRight && selBoxRight < origin[0])) &&
          ((startY < scriptBottom && selBoxBottom > origin[1]) ||
            (startY > scriptBottom && selBoxBottom < origin[1]))
        ) {
          selectedScripts.push(id);
        }
      }
      setSelected(selectedScripts);
      setSelectionBox(null);
    }
  };

  const handleWheel = (e: any) => {
    e.preventDefault();
    setScrollX(Math.max(0, scrollX + e.deltaX));
    setScrollY(Math.max(0, scrollY + e.deltaY));
  };

  return (
    <canvas
      ref={canvasRef}
      onWheel={handleWheel}
      height={heightWidth[0]}
      width={heightWidth[1]}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: dragging ? "grabbing" : "grab" }}
    />
  );
}

export type TimelineScript = Script & {
  color?: { background?: string; text?: string };
};
