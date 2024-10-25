import TileLine from "@/components/element/timeline/index";
import { DEFAULT_FILE, File } from "@/types/file";
import React, { createContext, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
export const FileContext = createContext<File>(DEFAULT_FILE);

export default function Main() {
  const [layout, setLayout] = React.useState<Layout>({
    mainPanel: [
      {
        type: "extensions",
        visible: true,
      },
      {
        type: "preview",
        visible: true,
      },
      {
        type: "extensions",
        visible: true,
      },
    ],
    timeline: {
      style: "justify", // justify, center, left,right
    },
  });
  const [file, setFile] = useState<File>(DEFAULT_FILE);

  return (
    <FileContext.Provider value={file}>
      <main className="flex-1">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={25}>
                {/* <Extensions/> */}
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                {/* <Preview/> */}
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={25}>
                {/* <Extensions/> */}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <TileLine setFile={setFile} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </FileContext.Provider>
  );
}
type Layout = {
  mainPanel: Panel[];
  timeline: {
    style: "justify" | "center" | "left" | "right";
  };
};
type Panel = {
  type: string;
  visible: boolean;
};
