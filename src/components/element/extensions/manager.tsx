import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
export default function ExtensionManager({
  extensions,
  setExtensions,
}: {
  extensions: Array<string>;
  setExtensions: (value: Array<string>) => void;
}) {
  const [open, setOpen] = React.useState(false);
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
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
