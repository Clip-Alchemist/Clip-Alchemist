import { ProjectFile, Script } from "@/types/projectFile";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EnabledExtensions } from "@/types/extensionInfo";

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
  const settings = [
    {
      name: "start",
      type: Number,
      value: currentScript?.start,
    },
    {
      name: "length",
      type: Number,
      value: currentScript?.length,
    },
    {
      name: "position",
      type: Object,
      settings: [
        {
          name: "x",
          type: Number,
          value: currentScript?.position.x,
        },
        {
          name: "y",
          type: Number,
          value: currentScript?.position.y,
        },
      ],
    },
  ];
  const extension = currentScript?.extension
    ? Object.values(enabledExtensions).find(
        e => e !== "Error" && e.id === currentScript.extension
      ) ?? "Error"
    : "Error";
  console.log("extension: ", extension);
  const extensionOptions =
    (extension !== "Error" && extension?.scriptOption) || {};
  console.log(extensionOptions);
  return (
    <Card
      className="rounded-none border-none shadow-none"
      key={currentScript?.id}
    >
      <CardHeader>
        <CardTitle>Edit</CardTitle>
      </CardHeader>
      <CardContent>
        {activeScript && (
          <>
            {settings.map(setting => {
              if (setting.type === Number) {
                return (
                  <div key={setting.name} className="flex items-center">
                    <Label htmlFor={setting.name} className="mr-2">
                      {setting.name}
                    </Label>
                    <Input
                      type="number"
                      id={setting.name}
                      value={setting.value}
                      onChange={e =>
                        setCurrentScript({
                          ...currentScript,
                          [setting.name]: parseInt(e.target.value),
                        } as Script)
                      }
                    />
                  </div>
                );
              }
              if (setting.type === Object) {
                return (
                  <div key={setting.name} className="">
                    <p className="mr-2">{setting.name}</p>
                    {setting.settings?.map(subSetting => (
                      <div
                        key={subSetting.name}
                        className="flex items-center pl-2"
                      >
                        <Label htmlFor={subSetting.name} className="mr-2">
                          {subSetting.name}
                        </Label>
                        <Input
                          type="number"
                          id={subSetting.name}
                          value={subSetting.value}
                          onChange={e =>
                            setCurrentScript({
                              ...currentScript,
                              position: {
                                ...currentScript?.position,
                                [subSetting.name]: parseInt(e.target.value),
                              },
                            } as Script)
                          }
                        />
                      </div>
                    ))}
                  </div>
                );
              }
            })}
            {Object.keys(extensionOptions).map(option => (
              <div key={option} className="flex items-center">
                <Label htmlFor={option} className="mr-2">
                  {option}
                </Label>
                <Input
                  type={extensionOptions[option].input}
                  id={option}
                  value={
                    currentScript?.extensionData?.[
                      `${currentScript.extension.split(".")[1]}.${option}`
                    ] ?? extensionOptions[option].default
                  }
                  onChange={e =>
                    setCurrentScript({
                      ...currentScript,
                      extensionData: {
                        ...currentScript?.extensionData,
                        [`${currentScript?.extension.split(".")[1]}.${option}`]:
                          e.target.value,
                      },
                    } as Script)
                  }
                />
              </div>
            ))}
          </>
        )}
        {!activeScript && "No script selected"}
      </CardContent>
    </Card>
  );
}
