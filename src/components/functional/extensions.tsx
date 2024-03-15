import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExtensionsList } from "@/types/extensionsList";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { BsTrash3 } from "react-icons/bs";
import { EnabledExtensions, ExtensionInfo } from "@/types/extensionInfo";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getExtensionInfo } from "@/lib/extension/getExtensionInfo";

export default function ExtensionsSettings({
  open,
  setOpen,
  extensionsList,
  setExtensionsList,
  defaultExtensionsList,
  enabledExtensions,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  extensionsList: ExtensionsList;
  setExtensionsList: React.Dispatch<React.SetStateAction<ExtensionsList>>;
  defaultExtensionsList: ExtensionsList | undefined;
  enabledExtensions: EnabledExtensions;
}) {
  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extensions</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {extensionsList.map(extension => (
            <Extension
              key={extension.path}
              extension={extension}
              extensionInfo={enabledExtensions[extension.path]}
              setExtension={extension => {
                setExtensionsList(
                  extensionsList.map(ext =>
                    ext.path === extension.path ? extension : ext
                  )
                );
              }}
              isDefault={
                !!defaultExtensionsList?.find(
                  ext => ext.path === extension.path
                )
              }
              remove={() => {
                setExtensionsList(
                  extensionsList.filter(ext => ext.path !== extension.path)
                );
              }}
            />
          ))}
          <form
            onSubmit={e => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const value = form.get("extensionPath") as string;
              setExtensionsList([
                ...extensionsList,
                ...value
                  .split("\n")
                  .filter(ext => ext !== "")
                  .map(ext => ({
                    path: ext,
                    valid: true,
                    version: "latest" as ExtensionsList[0]["version"],
                  })),
              ]);
              e.currentTarget.reset();
            }}
          >
            <h2>add extension</h2>
            <Textarea
              className="w-full"
              placeholder="Please enter the extensions path."
              name="extensionPath"
            />
            <Button type="submit">Add</Button>
          </form>
        </div>
        <div className="flex justify-end">
          <p className="opacity-80">
            All your settings are saved in automatically. But you have to
            restart app to config settings.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Save and Restart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function Extension({
  extension,
  setExtension,
  extensionInfo: cashedExtensionInfo,
  isDefault,
  remove,
}: {
  extension: ExtensionsList[0];
  setExtension: (extension: ExtensionsList[0]) => void;
  extensionInfo: ExtensionInfo | "Error" | undefined;
  isDefault?: boolean;
  remove: () => void;
}) {
  const [extensionInfo, setExtensionInfo] = useState<
    ExtensionInfo | "Error" | undefined
  >(cashedExtensionInfo);
  useEffect(() => {
    if (typeof cashedExtensionInfo === "object") return;
    (async () => {
      const extensionDetail = await getExtensionInfo(extension.path);
      setExtensionInfo(extensionDetail);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-2 rounded",
        extensionInfo == "Error" ? "bg-red-200" : "",
        extensionInfo == undefined ? "opacity-80" : ""
      )}
    >
      <p className="flex-1">
        {typeof extensionInfo === "object"
          ? extensionInfo?.name
          : `${extension.path} ${extensionInfo === "Error" ? "(Error)" : "(loading)"}`}
      </p>
      <Switch
        className="flex-none"
        checked={extension.valid}
        onCheckedChange={(checked: boolean) =>
          setExtension({ ...extension, valid: checked })
        }
      />
      <Button
        className="flex-none bg-gray-100 hover:bg-red-500 text-black disabled:bg-gray-300 disabled:opacity-60"
        disabled={isDefault}
        onClick={remove}
      >
        <BsTrash3 />
      </Button>
    </div>
  );
}
