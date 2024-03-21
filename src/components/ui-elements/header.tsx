"use client";
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
import ExtensionsSettings from "../functional/extensions";
import { EnabledExtensions, ExtensionsList } from "@/types/extensionInfo";
import Link from "next/link";
import { isElectron } from "@/common/isElectron";
export default function Header({
  openProjectFolder,
  saveProjectFile,
  projectFile,
  setProjectFile,
  saved,
  extensionsList,
  setExtensionsList,
  defaultExtensionsList,
  enabledExtensions,
}: {
  openProjectFolder: () => void;
  saveProjectFile: () => void;
  projectFile?: ProjectFile;
  setProjectFile: React.Dispatch<React.SetStateAction<ProjectFile | undefined>>;
  saved: boolean;
  extensionsList: ExtensionsList;
  setExtensionsList: React.Dispatch<React.SetStateAction<ExtensionsList>>;
  defaultExtensionsList: ExtensionsList | undefined;
  enabledExtensions: EnabledExtensions;
}) {
  const [openProjectSettings, setOpenProjectSettings] = useState(false);
  const [openExtensionsSettings, setOpenExtensionsSettings] = useState(false);
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
                Open Project<MenubarShortcut>Ctrl+O</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={saveProjectFile} disabled={!projectFile}>
                Save Project<MenubarShortcut>Ctrl+S</MenubarShortcut>
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
              <MenubarItem onClick={() => setOpenExtensionsSettings(true)}>
                Manage extensions
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/about" target="_blank">
                  About
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="documentation" target="_blank">
                  Documentation
                </Link>
              </MenubarItem>
              <MenubarItem>Version Info</MenubarItem>
              {!isElectron() && (
                <MenubarItem asChild>
                  <Link href="/download" target="_blank">
                    Download App
                  </Link>
                </MenubarItem>
              )}
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
      <ExtensionsSettings
        open={openExtensionsSettings}
        setOpen={setOpenExtensionsSettings}
        extensionsList={extensionsList}
        setExtensionsList={setExtensionsList}
        defaultExtensionsList={defaultExtensionsList}
        enabledExtensions={enabledExtensions}
      />
    </>
  );
}
