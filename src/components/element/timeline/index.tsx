import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { File } from "@/types/file";
import { useState } from "react";
export default function TileLine({ timelineData }: { timelineData?: File }) {
  const [SliderValue, setSliderValue] = useState([50]);
  return (
    <div className="hidden-scrollbar h-full w-full overflow-scroll">
      <div className="w-max">
        <div className="sticky inset-x-0 top-0 z-10 flex border-b bg-gray-50 py-2">
          <div className="sticky left-0 z-20 flex w-24 flex-none flex-col gap-1 bg-gray-50 px-2">
            <Select defaultValue="0">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"0"}>Root</SelectItem>
                  <SelectItem value={"1"}>Scene1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div
              className="h-6 cursor-pointer rounded bg-blue-900"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setSliderValue([Math.round((x / rect.width) * 100)]);
              }}
            >
              <div
                className="h-full rounded-l bg-blue-400"
                style={{ width: `${SliderValue}%` }}
              ></div>
              <Slider
                defaultValue={[50]}
                max={100}
                value={SliderValue}
                onValueChange={(value) => {
                  setSliderValue(value);
                }}
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
          <div className="flex flex-1">
            {new Array(100).fill(0).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex w-40 flex-none text-center",
                  "before:absolute before:bottom-0 before:block before:h-1/2 before:w-px before:translate-x-[-0.5px] before:bg-black",
                )}
              >
                <p>
                  {("00" + Math.floor(i / 3600)).slice(-2)}:
                  {("00" + Math.floor(i / 60)).slice(-2)}:
                  {("00" + (i % 60)).slice(-2)}
                </p>
                {new Array(9).fill(0).map((_, index) => (
                  <div
                    className={cn(
                      "absolute bottom-0 h-1/4 w-px bg-black",
                      `left-${(index + 1) * 4}`,
                      "translate-x-[-0.5px]",
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="left-12 left-16 left-20 left-24 left-28 left-32 left-36 left-4 left-8 hidden" />
        {/* The above code is required for compiling tailwind css */}
        <div>
          {new Array(25).fill(0).map((_, i) => (
            <div key={i} className="flex odd:bg-gray-100">
              <button className="sticky left-0 h-full w-24 flex-none py-2 text-center">
                Layer{i + 1}
              </button>
              <div className="flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
