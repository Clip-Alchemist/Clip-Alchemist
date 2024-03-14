"use client";
import { useLocalStorage } from "@/common/hooks/localstorag";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [extensionsList, setExtensionsList] = useLocalStorage<Array<string>>(
    "extensionsList",
    []
  );
  const [activeScript, setActiveScript] = useState<string | undefined>();
  const { toast } = useToast();
  const {
    openProjectFolder,
    saveProjectFile,
    projectFile,
    setProjectFile,
    saved,
    projectFolder,
  } = useProjectFolder((error: Error) => {
    toast({
      title: "Error",
      description: error.message,
      action: (
        <ToastAction onClick={openProjectFolder} altText="Try again">
          Try again
        </ToastAction>
      ),
    });
  });
  useEffect(() => {
    (async () => {
      const response = await fetch("/extensions/defaultExtensionsList.json");
      const data = await response.json();
      setExtensionsList([...new Set([...extensionsList, ...data])]);
      if ("serviceWorker" in navigator) {
        extensionsList.forEach(async extension => {
          const extensionDetail = await fetch(
            (extension.startsWith("http")
              ? extension
              : `/extensions/${extension}`) + "/extension.json"
          ).then(res => res.json());
          await extensionDetail?.scripts?.serviceWorker?.forEach(
            async (sw: string) => {
              await navigator.serviceWorker.register(
                extension.startsWith("http")
                  ? sw
                  : `/extensions/${extension}/${sw}`
              );
            }
          );
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header
        projectFile={projectFile}
        openProjectFolder={openProjectFolder}
        saveProjectFile={saveProjectFile}
        setProjectFile={setProjectFile}
        saved={saved}
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
