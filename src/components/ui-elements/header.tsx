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
import ProjectSettings from "../functional/projectSettings";
import { useState } from "react";
import { ProjectFile } from "@/types/projectFile";
export default function Header({
  openProjectFolder,
  saveProjectFile,
  projectFile,
  setProjectFile,
  saved,
}: {
  openProjectFolder: () => void;
  saveProjectFile: () => void;
  projectFile?: ProjectFile;
  setProjectFile: React.Dispatch<React.SetStateAction<ProjectFile | undefined>>;
  saved: boolean;
}) {
  const [openProjectSettings, setOpenProjectSettings] = useState(false);
  return (
    <>
      <header className="select-none bg-gray-50 flex-none relative">
        <div className="w-titleBar h-titleBar [-webkit-app-region:drag;]">
          <p className="-translate-x-1/2 left-1/2 text-center absolute inset-x-0 w-max">
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
