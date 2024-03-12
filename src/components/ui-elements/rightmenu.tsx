import { ProjectFile, Script } from "@/types/projectFile";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RightMenu({
  activeScript,
  projectFile,
  setProjectFile,
}: {
  activeScript?: string;
  projectFile?: ProjectFile;
  setProjectFile?: React.Dispatch<ProjectFile | undefined>;
}) {
  const currentScript = projectFile?.scenes
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
  return (
    <Card className="rounded-none border-none shadow-none">
      <CardHeader>
        <CardTitle>Edit</CardTitle>
      </CardHeader>
      <CardContent>
        {activeScript &&
          settings.map(setting => {
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
        {!activeScript && "No script selected"}
      </CardContent>
    </Card>
  );
}
