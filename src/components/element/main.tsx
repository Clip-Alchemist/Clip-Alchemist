import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
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
  return (
    <main className="flex-1">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              {/* <Extensions/> */}
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>{/* <Preview/> */}</ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              {/* <Extensions/> */}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>{/* <Timeline/> */}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
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
