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
  const [zoom, setZoom] = useState(1);
  return (
    <div className="hidden-scrollbar h-full w-full overflow-scroll">
      <div className="w-max">
        <div className="sticky inset-x-0 top-0 z-10 flex bg-gray-50">
          <div className="sticky left-0 z-20 w-24 flex-none bg-gray-50">
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
            <Slider defaultValue={[50]} max={100} />
          </div>
          <div className="flex flex-1">
            {new Array(100).fill(0).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex w-20 flex-none text-center",
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
                      `left-${(index + 1) * 2}`,
                      "translate-x-[-0.5px]",
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="left-10 left-12 left-14 left-16 left-18 left-2 left-20 left-4 left-6 left-8 hidden" />
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
