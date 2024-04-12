"use client";
import { convertRemToPx } from "@/lib/css/convertRemToPx";
import { Script } from "@/types/projectFile";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../ui/context-menu";
import { Media } from "@/types/extensionInfo";
import { createUUID } from "@/lib/uuid";
import TimelineScript from "./timelineScript";

export default function TimeLineMainContent({
  scripts,
  setScripts,
  activeScript,
  setActiveScript,
  zoomSize,
  fps,
  medias,
}: {
  scripts: Script[];
  setScripts: (s: Script[]) => void;
  activeScript?: string;
  setActiveScript: React.Dispatch<React.SetStateAction<string | undefined>>;
  zoomSize: number;
  fps: number;
  medias: Media[];
}) {
  const [x, setX] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(0);
  const s = scripts.find(s => s.id === activeScript);
  const COPY_URL = "https://clip-alchemist.github.io/Clip-Alchemist/#";
  function copy() {
    if (!s) return;
    const { id, ...rest } = s;
    navigator.clipboard.writeText(`${COPY_URL}${JSON.stringify(rest)}`);
  }
  async function paste() {
    const text = await navigator.clipboard.readText();
    if (text.startsWith(COPY_URL)) {
      const json = JSON.parse(text.slice(COPY_URL.length));
      setScripts([
        ...scripts,
        {
          ...json,
          id: createUUID(),
          start: x / zoomSize / fps,
          layer: selectedLayer,
        },
      ]);
    }
  }
  function remove() {
    if (!activeScript) return;
    setScripts(scripts.filter(s => s.id !== activeScript));
    setActiveScript(undefined);
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger
        onContextMenu={e => {
          setX(e.nativeEvent.offsetX);
          setSelectedLayer(
            Math.round(
              (e.clientY - e.currentTarget.getBoundingClientRect().top) /
                convertRemToPx(2.5)
            )
          );
        }}
      >
        <>
          {new Array(25).fill(0).map((_, i) => (
            <div key={i} className="flex odd:bg-gray-100 opacity-100 h-10">
              <button className="flex-none h-full w-20 text-center sticky left-0 z-20">
                Layer{i + 1}
              </button>
              <div className="flex-1 relative">
                {scripts
                  .filter((s: Script) => s.layer === i)
                  .map(s => (
                    <TimelineScript
                      key={s.id}
                      script={s}
                      setScripts={setScripts}
                      scripts={scripts}
                      zoomSize={zoomSize}
                      fps={fps}
                      activeScript={activeScript}
                      setActiveScript={setActiveScript}
                    />
                  ))}
              </div>
            </div>
          ))}
        </>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {activeScript && <ContextMenuItem onClick={copy}>copy</ContextMenuItem>}
        <ContextMenuItem onClick={paste}>Paste</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Add</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {medias.map(media =>
              Object.entries(media).map(([key, value]) => (
                <ContextMenuItem
                  key={key}
                  onClick={() => {
                    setScripts([
                      ...scripts,
                      {
                        id: createUUID(),
                        name: key,
                        extension: "clip-alchemist.text", //debug
                        start: x / zoomSize / fps,
                        length: 1,
                        layer: Math.round(selectedLayer),
                        "position.x": 0,
                        "position.y": 0,
                      },
                    ]);
                  }}
                >
                  {value.name}
                </ContextMenuItem>
              ))
            )}
          </ContextMenuSubContent>
        </ContextMenuSub>
        {activeScript && (
          <ContextMenuItem onClick={remove}>Remove</ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
