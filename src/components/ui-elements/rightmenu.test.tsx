import { render, fireEvent } from "@testing-library/react";
import RightMenu from "./rightmenu";
import { ProjectFile } from "@/types/projectFile";

describe("RightMenu", () => {
  const activeScript = "xxxxxxxx-xxxx-xxxx-4xxx-xxxxxxxxxxxx";
  const projectFile: ProjectFile = {
    scenes: [
      {
        scripts: [
          {
            name: "Script 1",
            id: "xxxxxxxx-xxxx-xxxx-4xxx-xxxxxxxxxxxx",
            extension: "test.extension",
            start: 0,
            length: 5,
            layer: 0,
            "position.x": 0,
            "position.y": 0,
          },
        ],
      },
    ],
  };
  const setProjectFile = jest.fn();
  const enabledExtensions = {
    // enabled extensions object
  };

  test("renders without errors", () => {
    render(
      <RightMenu
        activeScript={activeScript}
        projectFile={projectFile}
        setProjectFile={setProjectFile}
        enabledExtensions={enabledExtensions}
      />
    );
  });

  test("updates current script on input change", () => {
    const { getByLabelText } = render(
      <RightMenu
        activeScript={activeScript}
        projectFile={projectFile}
        setProjectFile={setProjectFile}
        enabledExtensions={enabledExtensions}
      />
    );
    const startInput = getByLabelText("start");
    // const lengthInput = getByLabelText("length");
    // const positionXInput = getByLabelText("x");
    // const positionYInput = getByLabelText("y");

    fireEvent.change(startInput, { target: { value: 5 } });
    // fireEvent.change(lengthInput, { target: { value: 10 } });
    // fireEvent.change(positionXInput, { target: { value: 15 } });
    // fireEvent.change(positionYInput, { target: { value: 20 } });

    expect(setProjectFile).toHaveBeenCalledWith({
      scenes: [
        {
          scripts: [
            {
              ...projectFile.scenes?.[0].scripts[0],
              name: "Script 1",
              id: "xxxxxxxx-xxxx-xxxx-4xxx-xxxxxxxxxxxx",
              extension: "test.extension",
              start: 5,
              // length: 10,
              // "position.x": 15,
              // "position.y": 20,
            },
          ],
        },
      ],
    });
  });
});
