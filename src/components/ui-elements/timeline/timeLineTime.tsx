"use client";
import { convertRemToPx } from "@/lib/css/convertRemToPx";
import React, { useState } from "react";

export default function TimeLineTime({
  zoomSize,
  fps,
}: {
  zoomSize: number;
  fps: number;
}) {
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
