"use client";
import { useLocalStorage } from "@/common/hooks/localStorage";
import { useEffect, useState } from "react";
import { ExtensionsList } from "../../types/extensionsList";
import { EnabledExtensions } from "@/types/extensionInfo";
import { getExtensionInfo } from "@/lib/extension/getExtensionInfo";

export function useExtensions(onErrorCallback?: (error: Error) => void) {
  const [extensionsList, setExtensionsList] = useLocalStorage<ExtensionsList>(
    "extensionsList",
    []
  );
  const [defaultExtensionsList, setDefaultExtensionsList] =
    useState<ExtensionsList>();
  const [enabledExtensions, setEnabledExtensions] = useState<EnabledExtensions>(
    {}
  );
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
          await Promise.all(
            extensionsList.map(extension => {
              return new Promise<void>(async resolve => {
                if (!extension.valid) return;
                const extensionDetail = await getExtensionInfo(
                  extension.path,
                  () =>
                    onErrorCallback?.(
                      new Error(
                        "Failed to fetch extension details. Extension path:" +
                          extension.path
                      )
                    )
                );
                setEnabledExtensions(prev => {
                  return {
                    ...prev,
                    [extension.path]: extensionDetail ?? "Error",
                  };
                });
                if (extensionDetail == "Error") return resolve();
                await extensionDetail?.scripts?.serviceWorker?.forEach(
                  async (sw: string) => {
                    await navigator.serviceWorker.register(
                      extension.path.startsWith("http")
                        ? sw
                        : `./extensions/${extension.path}/${sw}`
                    );
                  }
                );
                resolve();
              });
            })
          );
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
  return {
    extensionsList,
    setExtensionsList,
    defaultExtensionsList,
    enabledExtensions,
  };
}
