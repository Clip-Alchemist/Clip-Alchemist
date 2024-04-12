"use client";

export default function TimeLineTime({ time }: { time: number }) {
  const showTime = [
    ("00" + Math.floor(time / 60)).slice(-2),
    ("00" + Math.floor(time % 60)).slice(-2),
    ("00" + Math.floor((time * 100) % 100)).slice(-2),
  ].join(":");
  return <div className="flex-none w-20">{showTime}</div>;
}
