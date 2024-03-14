"use client";
import { useLocalStorage } from "@/common/hooks/localStorage";
import { useEffect } from "react";
import { ExtensionsList } from "../../types/extensionsList";

export function useExtensions() {
  const [extensionsList, setExtensionsList] = useLocalStorage<ExtensionsList>(
    "extensionsList",
    []
  );
  useEffect(() => {
    (async () => {
      const response = await fetch("./extensions/defaultExtensionsList.json");
      const data = await response.json();
      setExtensionsList(
        [...extensionsList, ...data].reduce((acc, cur) => {
          if (acc.find((ext: ExtensionsList[0]) => ext.path === cur.path)) {
            return acc;
          }
          return [...acc, cur];
        }, [])
      );
      if ("serviceWorker" in navigator) {
        extensionsList.forEach(async extension => {
          const extensionDetail = await fetch(
            (extension.path.startsWith("http")
              ? extension
              : `/extensions/${extension}`) + "/extension.json"
          ).then(res => res.json());
          await extensionDetail?.scripts?.serviceWorker?.forEach(
            async (sw: string) => {
              await navigator.serviceWorker.register(
                extension.path.startsWith("http")
                  ? sw
                  : `./extensions/${extension.path}/${sw}`
              );
            }
          );
        });
      }
    })();
    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => registration.unregister());
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { extensionsList, setExtensionsList };
}
