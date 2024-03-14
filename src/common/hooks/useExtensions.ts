"use client";
import { useLocalStorage } from "@/common/hooks/localStorage";
import { useEffect, useState } from "react";
import { ExtensionsList } from "../../types/extensionsList";

export function useExtensions(onErrorCallback?: (error: Error) => void) {
  const [extensionsList, setExtensionsList] = useLocalStorage<ExtensionsList>(
    "extensionsList",
    []
  );
  const [defaultExtensionsList, setDefaultExtensionsList] =
    useState<ExtensionsList>();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("./extensions/defaultExtensionsList.json");
        const data = await response.json();
        setDefaultExtensionsList(data);
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
            if (!extension.valid) return;
            const extensionDetail = await fetch(
              (extension.path.startsWith("http")
                ? extension
                : `/extensions/${extension.path}`) + "/extension.json"
            )
              .then(res => res.json())
              .catch(() => {
                onErrorCallback?.(
                  new Error(
                    "Failed to fetch extension details. Extension path:" +
                      extension.path
                  )
                );
              });
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
      } catch (e: any) {
        onErrorCallback?.(e);
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
  return { extensionsList, setExtensionsList, defaultExtensionsList };
}
