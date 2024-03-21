"use client";
import { ProjectFile } from "@/types/projectFile";
import React, { useState } from "react";
import { EnabledExtensions, Media } from "@/types/extensionInfo";
import TimeLineMainContent from "./timeLineMainContent";
import TimeLineBar from "./timeLineBar";
import TimeLineTime from "./timeLineTime";

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
  activeScript?: string;
  setActiveScript: React.Dispatch<React.SetStateAction<string | undefined>>;
  enabledExtensions: EnabledExtensions;
}) {
  const [zoomSize, setZoomSize] = useState(2); //px per frame
  const [scene, setScene] = useState(0);
  return (
    <div className="w-full h-full overflow-scroll hidden-scrollbar" key={scene}>
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
        <TimeLineMainContent
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
