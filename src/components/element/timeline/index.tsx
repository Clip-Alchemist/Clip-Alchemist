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
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface Item {
  id: string;
  type: "image" | "video";
  src: string;
  layer: number;
  startTime: number; // seconds
  duration: number; // seconds
}

const items: Item[] = [
  {
    id: "1",
    type: "image",
    src: "/image1.jpg",
    layer: 1,
    startTime: 10,
    duration: 5,
  },
  {
    id: "2",
    type: "video",
    src: "/video1.mp4",
    layer: 3,
    startTime: 20,
    duration: 10,
  },
  // ... more items
];
export default function TileLine({ timelineData }: { timelineData?: File }) {
  const [SliderValue, setSliderValue] = useState([50]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over) {
      const activeIndex = items.findIndex((item) => item.id === active.id);
      const overIndex = items.findIndex((item) => item.id === over.id);

      if (activeIndex !== overIndex) {
        const updatedItems = [...items];
        const [removed] = updatedItems.splice(activeIndex, 1);
        updatedItems.splice(overIndex, 0, removed);

        // Update item's layer and startTime based on the drop target
        const newLayer = parseInt(over.id.split("-")[1]);
        const newStartTime = Math.floor(
          (event.over.rect.left - event.over.offset.x) / 40,
        ); // Calculate startTime based on the drop position
        updatedItems[overIndex].layer = newLayer;
        updatedItems[overIndex].startTime = newStartTime;

        // Update items state (replace with your state management solution)
        // ...
      }
    }
    setActiveId(null);
  };
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
                  Layer {i + 1}
                </button>
                <div className="relative flex-1">
                  <Layer id={`layer-${i + 1}`} />
                  {items
                    .filter((item) => item.layer === i + 1)
                    .map((item) => (
                      <ItemComponent
                        key={item.id}
                        item={item}
                        timelineScale={40} // pixels per second
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <DragOverlay>
            {activeId ? (
              <ItemComponent
                item={items.find((item) => item.id === activeId)!}
                timelineScale={40}
                isDragging={true}
              />
            ) : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
}

function Layer({ id }: { id: string }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return <div ref={setNodeRef} className="h-8" />;
}

function ItemComponent({
  item,
  timelineScale,
  isDragging = false,
}: {
  item: Item;
  timelineScale: number;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = {
    transform: CSS.Translate.toString(
      transform || { x: 0, y: 0, scaleX: 1, scaleY: 1 },
    ), // デフォルト値を設定
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute h-6 cursor-move bg-blue-500`}
      style={{
        ...style,
        left: item.startTime * timelineScale,
        width: item.duration * timelineScale,
      }}
    >
      {item.type === "image" ? (
        <img src={item.src} alt="" className="h-full w-full object-cover" />
      ) : (
        <video src={item.src} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
