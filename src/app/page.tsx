"use client";
import { useLocalStorage } from "@/common/hooks/localstorag";
import LeftMenu from "@/components/ui-elements/leftmenu";
import MoviePreview from "@/components/ui-elements/movie_preview";
import RightMenu from "@/components/ui-elements/rightmenu";
import Timeline from "@/components/ui-elements/timeline";
import { useEffect } from "react";
import Split from "react-split";

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
        extensionsList.forEach(async (extension) => {
          const extensionDetail = await fetch(
            (extension.startsWith("http")
              ? extension
              : `/extensions/${extension}`) + "/extension.json"
          ).then((res) => res.json());
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
    <main className="w-screen mt-12 h-[calc(theme(height.screen)-3rem)]">
      <Split
        className="h-full w-full"
        sizes={[75, 25]}
        direction="vertical"
        gutterStyle={() => ({})}
        gutterSize={4}
        gutter={() => {
          const gutterElement = document.createElement("div");
          gutterElement.className = `h-[4px] bg-gray-200 hover:cursor-row-resize hover:bg-gray-400 transition-all delay-300 duration-300 ease-in-out`;
          return gutterElement;
        }}
      >
        <Split
          sizes={[25, 50, 25]}
          className="flex w-full h-full"
          gutterStyle={() => ({})}
          gutter={() => {
            const gutterElement = document.createElement("div");
            gutterElement.className = `w-[4px] bg-gray-200 hover:cursor-col-resize hover:w-4 hover:border-x hover:bg-gray-400 transition-all delay-300 duration-300 ease-in-out`;
            return gutterElement;
          }}
        >
          <LeftMenu />
          <MoviePreview />
          <RightMenu />
        </Split>
        <Timeline />
      </Split>
    </main>
  );
}
