"use client";
import { ProjectFile } from "@/types/projectFile";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Timeline({
  projectFile,
}: {
  projectFile?: ProjectFile;
}) {
  const [zoomSize, setZoomSize] = useState(2); //px per frame
  return (
    <div className="w-full h-full overflow-scroll hidden-scrollbar">
      <div className="w-max relative">
        <div className="flex h-6 inset-x-0 sticky top-0 bg-gray-50 z-10">
          <select
            className="flex-none w-20 sticky top-0 left-0 z-20"
            defaultValue={0}
          >
            <option value={0}>root</option>
            {new Array(100).fill(0).map((_, i) => (
              <option key={i} value={i + 1}>
                Scene{i + 1}
              </option>
            ))}
          </select>
          <div
            className="flex-1 flex relative"
            style={{
              width: `${100 * (projectFile?.settings?.fps || 60) * zoomSize}px`,
            }}
          >
            {new Array(100).fill(0).map((_, i) => (
              <TimeLineTime
                key={i}
                zoomSize={zoomSize}
                fps={projectFile?.settings?.fps || 60}
              />
            ))}
          </div>
          <nav className="sticky top-0 bg-gray-100 flex   right-0 z-50">
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
        <div>
          {new Array(25).fill(0).map((_, i) => (
            <div key={i} className="flex odd:bg-gray-100">
              <button className="flex-none h-full w-20 text-center py-2  sticky left-0">
                Layer{i + 1}
              </button>
              <div className="flex-1"></div>
            </div>
          ))}
        </div>
        <TimeLineBar zoomSize={zoomSize} />
      </div>
    </div>
  );
}
function TimeLineBar({ zoomSize }: { zoomSize: number }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  return (
    <div
      className="absolute top-0 w-0.5 h-full bg-gray-500 z-10 cursor-ew-resize opacity-50"
      style={{ left: `calc(5rem + ${currentFrame / zoomSize}px)` }}
      onMouseDown={e => {
        const startX = e.clientX;
        const startFrame = currentFrame;
        const onMouseMove = (e: MouseEvent) => {
          setCurrentFrame(
            Math.max(0, startFrame + (e.clientX - startX) * zoomSize)
          );
        };
        const onMouseUp = () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
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
  console.log(x, time);
  return (
    <div
      className="flex-none w-20"
      ref={e => {
        if (e) {
          setX(e.getBoundingClientRect().left);
        }
      }}
    >
      {("00" + Math.floor(time / 60)).slice(-2)}:
      {("00" + Math.floor(time % 60)).slice(-2)}:
      {("00" + Math.floor((time * 100) % 100)).slice(-2)}
    </div>
  );
}
