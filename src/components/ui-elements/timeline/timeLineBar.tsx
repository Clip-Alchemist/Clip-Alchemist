"use client";
import { useState } from "react";

export default function TimeLineBar({ zoomSize }: { zoomSize: number }) {
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
      data-testid="timeline-bar"
    />
  );
}
