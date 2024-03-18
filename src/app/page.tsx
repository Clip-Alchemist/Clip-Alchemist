"use client";
import { useProjectFolder } from "@/common/hooks/useProjectFolder";
import FileTree from "@/components/ui-elements/filetree";
import Header from "@/components/ui-elements/header";
import MoviePreview from "@/components/ui-elements/movie_preview";
import RightMenu from "@/components/ui-elements/rightmenu";
import Timeline from "@/components/ui-elements/timeline";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";
import { useState } from "react";
import { useExtensions } from "../common/hooks/useExtensions";

export default function Home() {
  const [activeScript, setActiveScript] = useState<string | undefined>();
  function onErrorCallback(error: Error, action?: any) {
    toast("Error", {
      description: error.message,
      action,
      style: {
        background: "#ffcdd2",
      },
      duration: 1000,
    });
  }
  const {
    openProjectFolder,
    saveProjectFile,
    projectFile,
    setProjectFile,
    saved,
    projectFolder,
  } = useProjectFolder(e =>
    onErrorCallback(e, { label: "Try again", onClick: openProjectFolder })
  );
  const {
    extensionsList,
    setExtensionsList,
    defaultExtensionsList,
    enabledExtensions,
  } = useExtensions(onErrorCallback);
  return (
    <>
      <Header
        projectFile={projectFile}
        openProjectFolder={openProjectFolder}
        saveProjectFile={saveProjectFile}
        setProjectFile={setProjectFile}
        saved={saved}
        extensionsList={extensionsList}
        setExtensionsList={setExtensionsList}
        defaultExtensionsList={defaultExtensionsList}
        enabledExtensions={enabledExtensions}
      />
      <main className="w-full flex-1">
        <ResizablePanelGroup className="h-full w-full" direction="vertical">
          <ResizablePanel defaultSize={75} minSize={10}>
            <ResizablePanelGroup
              className="flex w-full h-full"
              direction="horizontal"
            >
              <ResizablePanel defaultSize={25} minSize={10}>
                <FileTree projectFolder={projectFolder} />
              </ResizablePanel>
              <ResizableHandle className="bg-gray-100 hover:bg-gray-400" />
              <ResizablePanel defaultSize={50} minSize={10}>
                <MoviePreview />
              </ResizablePanel>
              <ResizableHandle className="bg-gray-100 hover:bg-gray-400" />
              <ResizablePanel defaultSize={25} minSize={10}>
                <RightMenu
                  activeScript={activeScript}
                  projectFile={projectFile}
                  setProjectFile={setProjectFile}
                  enabledExtensions={enabledExtensions}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="bg-gray-100 hover:bg-gray-400" />
          <ResizablePanel defaultSize={25} minSize={10}>
            <Timeline
              projectFile={projectFile}
              setProjectFile={setProjectFile}
              activeScript={activeScript}
              setActiveScript={setActiveScript}
              enabledExtensions={enabledExtensions}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
