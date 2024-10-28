import { useEffect } from "react";
import * as Comlink from "comlink";
export function useExtensions(extensions: Array<string>) {
  useEffect(() => {
    (async () => {
      const manifests = await Promise.all(
        extensions.map(async (url) => {
          const response = await fetch(url);
          const manifest = await response.json();
          return { url: new URL(url, location.origin), ...manifest };
        }),
      );
      const initCode = await fetch(
        new URL("extensions/init.js", location.origin),
      ).then((r) => r.text());
      await Promise.all(
        manifests.map(async (manifest) => {
          const script = manifest?.main;
          if (!script) return;

          const code = await fetch(new URL(script, manifest.url)).then((r) =>
            r.text(),
          );

          const blob = new Blob([initCode, code], {
            type: "text/javascript",
          });
          const workerURL = URL.createObjectURL(blob);
          const worker = new Worker(workerURL);

          // ワーカーを終了させるためのクリーンアップ処理
          return () => {
            worker.terminate();
            URL.revokeObjectURL(workerURL);
          };
        }),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// 無効にするAPIのリスト
const disabledAPIs = ["console", "localStorage" /* 他にも追加可能 */];
function createProxy(obj: any) {
  return new Proxy(obj, {
    get(target, prop) {
      if (typeof prop === "string" && disabledAPIs.includes(prop)) {
        // APIを無効にする (ここでは空の関数を返す)
        return (...args: any[]) => {};
      } else if (
        typeof prop === "string" &&
        prop.startsWith("clipalchemist.")
      ) {
        // ... (clipalchemist.xxx の処理は変更なし)
      }
      return target[prop]; // 他のプロパティはそのまま返す
    },
  });
}
const clipalchemist = {
  _listeners: {} as { [key: string]: Function[] },

  addEventListener: (eventName: string, listener: Function) => {
    /* ... */
  },
  removeEventListener: (eventName: string, listener: Function) => {
    /* ... */
  },
  dispatchEvent: (eventName: string, ...args: any[]) => {
    /* ... */
  },

  init: async (proxy: any) => {
    // Initialization logic here
  },
  log: (message: string) => {
    /* ... */
  },
  message: (message: string) => {
    /* ... */
  },

  // ... 他のAPI...
} as const;
