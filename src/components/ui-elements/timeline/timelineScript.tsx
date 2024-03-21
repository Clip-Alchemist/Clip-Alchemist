"use client";
import { convertRemToPx } from "@/lib/css/convertRemToPx";
import { cn } from "@/lib/utils";
import { Script } from "@/types/projectFile";
import React from "react";

export default function TimelineScript({
  script: s,
  setScripts,
  scripts,
  zoomSize,
  fps,
  activeScript,
  setActiveScript,
}: {
  script: Script;
  setScripts: (s: Script[]) => void;
  scripts: Script[];
  zoomSize: number;
  fps: number;
  activeScript: string | undefined;
  setActiveScript?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const isActive = s.id === activeScript;
  return (
    <div
      key={s.id}
      className={cn(
        "absolute bg-blue-200 inset-y-0 z-10 cursor-move opacity-50 hover:opacity-80",
        isActive && "opacity-100 hover:opacity-100"
      )}
      style={{
        left: s.start * zoomSize * fps,
        width: s.length * zoomSize * fps,
      }}
      onClick={() => setActiveScript?.(s.id)}
      onMouseDown={e => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startFrame = s.start;
        document.body.style.cursor = "move";
        const onMouseMove = (e: MouseEvent) => {
          setScripts(
            scripts.map((script: Script) => {
              if (script.id === s.id) {
                return {
                  ...script,
                  start: Math.max(
                    0,
                    startFrame + (e.clientX - startX) / zoomSize / fps
                  ),
                  layer: Math.max(
                    0,
                    script.layer +
                      Math.round((e.clientY - startY) / convertRemToPx(2.5))
                  ),
                };
              }
              return script;
            })
          );
        };
        const onMouseUp = () => {
          document.body.style.cursor = "auto";
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }}
    >
      {s?.name || s.extension}
    </div>
  );
}
