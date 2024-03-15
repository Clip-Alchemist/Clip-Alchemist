import { ExtensionInfo } from "@/types/extensionInfo";

export async function getExtensionInfo(
  path: string,
  onErrorCallback?: (error: Error) => void
): Promise<ExtensionInfo | "Error"> {
  const extensionInfo = await fetch(
    (path.startsWith("http") ? path : `/extensions/${path}`) + "/extension.json"
  )
    .then(res => res.json())
    .catch(e => {
      onErrorCallback?.(e);
    });
  return extensionInfo ?? "Error";
}
