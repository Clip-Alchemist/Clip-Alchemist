import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ProjectFile } from "@/types/projectFile";

export default function ProjectSettings({
  open,
  setOpen,
  projectFile,
  setProjectFile,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectFile: ProjectFile | undefined;
  setProjectFile: React.Dispatch<React.SetStateAction<ProjectFile>>;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("save");
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setProjectFile({
      ...projectFile,
      name: form.get("projectName") as string,
      settings: {
        width: Number(form.get("width")),
        height: Number(form.get("height")),
        fps: Number(form.get("fps")),
      },
    });
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Project Settings</DialogTitle>
          </DialogHeader>
          <div className="grid items-center gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="flex" htmlFor="projectName">
                Project name
              </Label>
              <Input
                type="text"
                placeholder="project name"
                name="projectName"
                id="projectName"
                defaultValue={projectFile?.name || "untitled"}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="flex" htmlFor="width">
                Width
              </Label>
              <Input
                type="number"
                placeholder="width"
                name="width"
                id="width"
                defaultValue={projectFile?.settings?.width || 1920}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="flex" htmlFor="height">
                Height
              </Label>
              <Input
                type="number"
                placeholder="height"
                name="height"
                id="height"
                defaultValue={projectFile?.settings?.height || 1080}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="flex" htmlFor="fps">
                FPS
              </Label>
              <Input
                type="number"
                placeholder="fps"
                name="fps"
                id="fps"
                defaultValue={projectFile?.settings?.fps || 60}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
