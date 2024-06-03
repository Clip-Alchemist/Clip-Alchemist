import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
export default function ExtensionManager({
  extensions,
  setExtensions,
}: {
  extensions: Array<string>;
  setExtensions: React.Dispatch<React.SetStateAction<Array<string>>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState("");
  console.log(extensions);
  useEffect(() => {
    function handleOpen() {
      console.debug("open-extensions-manager");
      setOpen(true);
    }
    window.addEventListener("open-extensions-manager", handleOpen);
    return () => {
      window.removeEventListener("open-extensions-manager", handleOpen);
    };
  }, []);
  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ExtensionManager</DialogTitle>
        </DialogHeader>
        <div>
          {extensions.map((e, i) => (
            <div key={e} className="flex">
              <p className="flex-1">{e}</p>
              <Button
                className="flex-none"
                onClick={() => {
                  setExtensions((prev) => {
                    const next = [...prev];
                    next.splice(i, 1);
                    return next;
                  });
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
        <div>
          <Textarea
            placeholder="Please enter the extensions path."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <Button
            onClick={() => {
              setExtensions((prev) => [...prev, textareaValue]);
              setTextareaValue("");
            }}
          >
            <PlusIcon />
          </Button>
        </div>{" "}
        <DialogFooter>
          <Button onClick={() => window.location.reload()}>
            save and reload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
