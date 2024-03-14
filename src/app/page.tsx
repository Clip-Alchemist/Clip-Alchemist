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
import { ToastAction, ToastActionElement } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useExtensions } from "../common/hooks/useExtensions";

export default function Home() {
  const [activeScript, setActiveScript] = useState<string | undefined>();
  const { toast } = useToast();
  function onErrorCallback(error: Error, action?: ToastActionElement) {
    toast({
      title: "Error",
      description: error.message,
      action,
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
    onErrorCallback(
      e,
      <ToastAction onClick={openProjectFolder} altText="Try again">
        Try again
      </ToastAction>
    )
  );
  const { extensionsList, setExtensionsList, defaultExtensionsList } =
    useExtensions(onErrorCallback);
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
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
