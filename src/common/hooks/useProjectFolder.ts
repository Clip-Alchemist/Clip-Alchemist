import { useState } from "react";
import { showDirectoryPicker } from "@/lib/window/showDirectoryPicker";
import { ProjectFile } from "@/types/projectFile";
export function useProjectFolder(onErrorCallback?: (error: Error) => void) {
  const [projectFolder, setProjectFolder] = useState<
    FileSystemDirectoryHandle | undefined
  >();
  const [projectFile, setProjectFile] = useState<ProjectFile | undefined>();
  const [savedProjectFile, setSavedProjectFile] = useState<
    ProjectFile | undefined
  >();
  console.log(projectFile);
  async function openProjectFolder() {
    try {
      const projectFolder = await showDirectoryPicker({
        mode: "readwrite",
      });
      setProjectFolder(projectFolder);
      const projectFile = await projectFolder?.getFileHandle(
        "project.clipalchemist",
        {
          create: true,
        }
      );
      const file = await projectFile?.getFile();
      const content = await file?.text();
      setProjectFile(JSON.parse(content || JSON.stringify({})));
      setSavedProjectFile(JSON.parse(content || JSON.stringify({})));
    } catch (error: any) {
      onErrorCallback?.(error);
    }
  }
  // Save the project file to the project folder(NOT auto save)
  async function saveProjectFile() {
    try {
      const file = await projectFolder?.getFileHandle("project.clipalchemist", {
        create: true,
      });
      const writable = await file?.createWritable();
      await writable?.write(JSON.stringify(projectFile));
      await writable?.close();
      setSavedProjectFile(projectFile);
    } catch (error: any) {
      onErrorCallback?.(error);
    }
  }
  return {
    projectFolder,
    projectFile,
    setProjectFile,
    openProjectFolder,
    saveProjectFile,
    saved: JSON.stringify(projectFile) === JSON.stringify(savedProjectFile),
  };
}
