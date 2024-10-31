import { ExtensionManifest } from "@/types/extensions/extensionJson";
import { useEffect, useState } from "react";
import { requestToWorker } from "./requestToWorker";
export function useExtensions(extensions: Array<string>) {
  const [extensionsWorkers, setExtensionsWorkers] = useState<
    {
      worker?: Worker;
      manifest: ExtensionManifest & { url: URL };
    }[]
  >([]);
  useEffect(() => {
    (async () => {
      const manifests: (ExtensionManifest & { url: URL })[] = await Promise.all(
        extensions.map(async (url) => {
          const response = await fetch(url);
          const manifest = await response.json();
          return { url: new URL(url, location.origin), ...manifest };
        }),
      );
      const initCode = await fetch(
        new URL("extensions/init.js", location.origin),
      ).then((r) => r.text());
      const extensionsWorkers = await Promise.all(
        manifests.map(async (manifest) => {
          const script = manifest?.main;
          if (!script) return { manifest };
          const code = await fetch(new URL(script, manifest.url)).then((r) =>
            r.text(),
          );
          const blob = new Blob([initCode, code], {
            type: "text/javascript",
          });
          const workerURL = URL.createObjectURL(blob);
          const worker = new Worker(workerURL);
          worker.addEventListener("message", (e) => {
            if (e.data.type === "log") {
              console.log(`[${manifest.id}]`, e.data?.message);
            }
            if (e.data.type === "open") {
              console.debug(`[${manifest.id}]`, "open", e.data.url);
              window.open(e.data.url);
            }
          });
          manifest?.scripts &&
            manifest?.scripts?.forEach(({ event, script }) => {
              window.addEventListener(event, (e) => {
                requestToWorker(worker, script);
              });
            });
          await requestToWorker(worker, "init");
          return { worker, manifest };
        }),
      );
      setExtensionsWorkers(extensionsWorkers);
    })();
    // delete worker
    return () => {
      extensionsWorkers.forEach(({ worker }) => {
        worker?.terminate();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return extensionsWorkers;
}
