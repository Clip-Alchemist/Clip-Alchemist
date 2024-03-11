import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function FileTree({
  projectFolder,
}: {
  projectFolder: FileSystemDirectoryHandle | undefined;
}) {
  return (
    <Card className="rounded-none border-0 shadow-none">
      <CardHeader>
        <CardTitle>Project Files</CardTitle>
      </CardHeader>
      <CardContent>
        {!projectFolder && (
          <CardDescription>
            Open a project folder to see the files
          </CardDescription>
        )}
        {projectFolder && <Folder directory={projectFolder} />}
      </CardContent>
    </Card>
  );
}
function Folder({ directory }: { directory: FileSystemDirectoryHandle }) {
  const [children, setChildren] = useState<
    (FileSystemHandle | FileSystemDirectoryHandle)[]
  >([]);
  useEffect(() => {
    (async () => {
      const temp = [];
      for await (const handle of directory.values()) {
        if (!(handle.name == "project.clipalchemist")) temp.push(handle);
      }
      setChildren(temp);
    })();
  }, [directory]);
  return (
    <div className="pl-2">
      <p className="w-full truncate">{directory.name}</p>
      {children.map((child, index) => {
        if (child.kind === "directory") {
          return (
            <Folder
              key={index}
              directory={child as FileSystemDirectoryHandle}
            />
          );
        } else {
          return <File key={index} file={child as FileSystemFileHandle} />;
        }
      })}
    </div>
  );
}
function File({ file }: { file: FileSystemFileHandle }) {
  return <div className="pl-2 w-full truncate">{file.name}</div>;
}
