import { ProjectFile, Script } from "@/types/projectFile";
import { EnabledExtensions } from "@/types/extensionInfo";
import { commonOptions } from "@/lib/extension/commonOptions";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
// import { FontInput } from "./fontInput";

export default function RightMenu({
  activeScript,
  projectFile,
  setProjectFile,
  enabledExtensions,
}: {
  activeScript?: string;
  projectFile?: ProjectFile;
  setProjectFile?: React.Dispatch<ProjectFile | undefined>;
  enabledExtensions: EnabledExtensions;
}) {
  const currentScript: Script | undefined = projectFile?.scenes
    ?.find(scene => scene.scripts.find(script => script.id === activeScript))
    ?.scripts.find(script => script.id === activeScript);
  function setCurrentScript(newScript: Script) {
    const currentSceneIndex = projectFile?.scenes?.findIndex(scene =>
      scene.scripts.find(script => script.id === activeScript)
    );
    setProjectFile?.({
      ...projectFile,
      scenes: projectFile?.scenes?.map((scene, i) => {
        if (i === currentSceneIndex) {
          return {
            ...scene,
            scripts: scene.scripts.map(script => {
              if (script.id === activeScript) {
                return newScript;
              }
              return script;
            }),
          };
        }
        return scene;
      }),
    });
  }

  const extension = currentScript?.extension
    ? Object.values(enabledExtensions).find(
        e => e !== "Error" && e.id === currentScript.extension
      ) ?? "Error"
    : "Error";
  const extensionOptions =
    (extension !== "Error" && extension?.scriptOption) || {};
  return (
    <Card
      className="rounded-none border-none shadow-none h-full flex flex-col"
      key={currentScript?.id}
    >
      <CardHeader className="flex-none">
        <CardTitle>Edit</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 overflow-y-scroll flex-1">
        {activeScript ? (
          <>
            {[
              ...Object.values(commonOptions || {}),
              ...Object.values(extensionOptions),
            ].map(option => (
              <div key={option.id} className="">
                <Label htmlFor={option.id} className="">
                  {option.name ?? option.id}
                </Label>
                {/* {option.input === "font" ? (
                  <FontInput
                    value={currentScript?.[option.id] ?? option.default}
                    setValue={value =>
                      setCurrentScript({
                        ...currentScript,
                        [option.id]: value,
                      } as Script)
                    }
                  />
                ) : ( */}
                <Input
                  type={option.input}
                  id={option.id}
                  value={currentScript?.[option.id] ?? option.default}
                  onChange={e =>
                    setCurrentScript({
                      ...currentScript,
                      [option.id]: e.target.value,
                    } as Script)
                  }
                  placeholder={option?.placeholder || ""}
                />
                {/* )} */}
              </div>
            ))}
          </>
        ) : (
          "No script selected"
        )}
      </CardContent>
    </Card>
  );
}
