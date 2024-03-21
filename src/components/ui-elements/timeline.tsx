"use client";
import { convertRemToPx } from "@/lib/css/convertRemToPx";
import { cn } from "@/lib/utils";
import { ProjectFile, Script } from "@/types/projectFile";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { EnabledExtensions, Media } from "@/types/extensionInfo";
import { createUUID } from "@/lib/uuid";

export default function Timeline({
  projectFile,
  setProjectFile,
  activeScript,
  setActiveScript,
  enabledExtensions,
}: {
  projectFile?: ProjectFile;
  setProjectFile?: React.Dispatch<
    React.SetStateAction<ProjectFile | undefined>
  >;
  activeScript: string;
  setActiveScript: React.Dispatch<React.SetStateAction<string | undefined>>;
  enabledExtensions: EnabledExtensions;
}) {
  const [zoomSize, setZoomSize] = useState(2); //px per frame
  const [scene, setScene] = useState(0);
  return (
    <div className="w-full h-full overflow-scroll hidden-scrollbar">
      <div className="w-max relative">
        <div className="flex h-6 inset-x-0 sticky top-0 bg-gray-50 z-10">
          <select
            className="flex-none w-20 sticky top-0 left-0 z-20"
            defaultValue={0}
            onChange={e => setScene(Number(e.target.value))}
          >
            <option value={0}>root</option>
            {new Array(100).fill(0).map((_, i) => (
              <option key={i} value={i + 1}>
                Scene{i + 1}
              </option>
            ))}
          </select>
          <div className="flex-1 flex">
            {new Array(100).fill(0).map((_, i) => (
              <TimeLineTime
                key={i}
                zoomSize={zoomSize}
                fps={projectFile?.settings?.fps || 60}
              />
            ))}
          </div>
          <nav className="sticky top-0 bg-gray-100 flex right-0 z-50">
            <button
              onClick={() => setZoomSize(Math.max(zoomSize - 0.5, 0.5))}
              className="w-6 bg-gray-200 hover:bg-gray-300"
            >
              -
            </button>
            <button
              onClick={() => setZoomSize(zoomSize + 0.5)}
              className="w-6 bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </nav>
        </div>
        <RightClickMenu
          key={scene}
          scripts={projectFile?.scenes?.[scene]?.scripts || []}
          setScripts={s => {
            //TODO: it seems not to move
            const currentSceneIndex = scene;
            setProjectFile?.({
              ...projectFile,
              scenes: projectFile?.scenes?.map((scene, i) => {
                if (i === currentSceneIndex) {
                  return { ...scene, scripts: s };
                }
                return scene;
              }),
            });
          }}
          activeScript={activeScript}
          setActiveScript={setActiveScript}
          zoomSize={zoomSize}
          fps={projectFile?.settings?.fps || 60}
          medias={
            Object.values(enabledExtensions)
              .map(extension =>
                extension !== "Error" ? extension?.media : undefined
              )
              .filter(m => m !== undefined) as Media[]
          }
        />
        <TimeLineBar zoomSize={zoomSize} />
      </div>
    </div>
  );
}
function RightClickMenu({
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
  activeScript: string;
  setActiveScript: React.Dispatch<React.SetStateAction<string | undefined>>;
  zoomSize: number;
  fps: number;
  medias: Media[];
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Add</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {medias.map(media =>
              Object.entries(media).map(([key, value]) => (
                <ContextMenuItem
                  key={key}
                  onClick={e => {
                    setScripts([
                      ...scripts,
                      {
                        id: createUUID(),
                        name: key,
                        extension: "clip-alchemist.text", //debug
                        start:
                          (e.currentTarget.getBoundingClientRect().left -
                            convertRemToPx(5)) /
                          zoomSize /
                          fps,
                        length: 1,
                        layer: Math.round(
                          e.currentTarget.getBoundingClientRect().top /
                            convertRemToPx(2.5)
                        ),
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
          <ContextMenuItem
            onClick={() => {
              setScripts(scripts.filter(s => s.id !== activeScript));
              setActiveScript(undefined);
            }}
          >
            Remove
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
function TimelineScript({
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
function TimeLineBar({ zoomSize }: { zoomSize: number }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={
        (isActive && "active") +
        " absolute top-0 w-0.5 h-full bg-gray-500 z-10 opacity-50 [&.active]:opacity-100 cursor-col-resize"
      }
      style={{ left: `calc(5rem + ${currentFrame / zoomSize}px)` }}
      onMouseDown={e => {
        const startX = e.clientX;
        const startFrame = currentFrame;
        setIsActive(true);
        document.body.style.cursor = "col-resize";
        const onMouseMove = (e: MouseEvent) => {
          setCurrentFrame(
            Math.max(0, startFrame + (e.clientX - startX) * zoomSize)
          );
        };
        const onMouseUp = () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
          setIsActive(false);
          document.body.style.cursor = "auto";
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }}
    />
  );
}
function TimeLineTime({ zoomSize, fps }: { zoomSize: number; fps: number }) {
  const [x, setX] = useState(0);
  const time = x / zoomSize / fps; // time in seconds
  return (
    <div
      className="flex-none w-20"
      ref={e => {
        if (e) {
          setX(e.getBoundingClientRect().left - convertRemToPx(5));
        }
      }}
    >
      {("00" + Math.floor(time / 60)).slice(-2)}:
      {("00" + Math.floor(time % 60)).slice(-2)}:
      {("00" + Math.floor((time * 100) % 100)).slice(-2)}
    </div>
  );
}
