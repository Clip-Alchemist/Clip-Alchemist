"use client";
import { useLocalStorage } from "@/common/hooks/localstorag";
import LeftMenu from "@/components/ui-elements/leftmenu";
import MoviePreview from "@/components/ui-elements/movie_preview";
import RightMenu from "@/components/ui-elements/rightmenu";
import Timeline from "@/components/ui-elements/timeline";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";

export default function Home() {
  const [extensionsList, setExtensionsList] = useLocalStorage<Array<string>>(
    "extensionsList",
    []
  );
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
          console.log(extensionDetail.id, " started!");
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="w-full flex-1">
      <ResizablePanelGroup className="h-full w-full" direction="vertical">
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup
            className="flex w-full h-full"
            direction="horizontal"
          >
            <ResizablePanel defaultSize={25}>
              <LeftMenu />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <MoviePreview />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <RightMenu />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>
          <Timeline />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
