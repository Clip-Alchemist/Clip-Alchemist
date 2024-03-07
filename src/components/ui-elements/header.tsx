"use client";
import { useProjectFolder } from "@/common/hooks/useProjectFolder";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import ProjectSettings from "../functional/projectSettings";
import { useState } from "react";
import { ProjectFile } from "@/types/projectFile";
export default function Header() {
  const { toast } = useToast();
  const {
    openProjectFolder,
    saveProjectFile,
    projectFile,
    setProjectFile,
    saved,
  } = useProjectFolder((error: Error) => {
    toast({
      title: "Error",
      description: error.message,
      action: (
        <ToastAction onClick={openProjectFolder} altText="Try again">
          Try again
        </ToastAction>
      ),
    });
  });
  const [openProjectSettings, setOpenProjectSettings] = useState(false);
  return (
    <>
      <header className="select-none bg-gray-50 flex-none">
        <div>
          <p className="w-full text-center my-0">
            {!saved && "*"}
            {projectFile?.name ? projectFile.name : "Clip Alchemist"}
          </p>
        </div>
        <Menubar className="bg-gray-50">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarItem onClick={openProjectFolder}>
                Open<MenubarShortcut>Ctrl+O</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={saveProjectFile} disabled={!projectFile}>
                Save<MenubarShortcut>Ctrl+S</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setOpenProjectSettings(true)}>
                Project Settings
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Settings</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Manage extensions</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>About</MenubarItem>
              <MenubarItem>Documentation</MenubarItem>
              <MenubarItem>Version</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="h-full static" />
      </header>
      <ProjectSettings
        open={openProjectSettings}
        setOpen={setOpenProjectSettings}
        projectFile={projectFile}
        setProjectFile={
          setProjectFile as React.Dispatch<React.SetStateAction<ProjectFile>>
        }
      />
    </>
  );
}
