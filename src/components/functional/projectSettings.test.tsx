import { render, fireEvent } from "@testing-library/react";
import ProjectSettings from "./projectSettings";
import { ProjectFile } from "@/types/projectFile";

describe("ProjectSettings", () => {
  const projectFile: ProjectFile = {
    name: "My Project",
    settings: {
      width: 1920,
      height: 1080,
      fps: 60,
    },
  };

  const setProjectFile = jest.fn();

  test("renders without errors", () => {
    render(
      <ProjectSettings
        open={true}
        setOpen={jest.fn()}
        projectFile={projectFile}
        setProjectFile={setProjectFile}
      />
    );
  });

  test("updates project file on form submission", () => {
    const { getByLabelText, getByText } = render(
      <ProjectSettings
        open={true}
        setOpen={jest.fn()}
        projectFile={projectFile}
        setProjectFile={setProjectFile}
      />
    );

    const projectNameInput = getByLabelText("Project name") as HTMLInputElement;
    const widthInput = getByLabelText("Width") as HTMLInputElement;
    const heightInput = getByLabelText("Height") as HTMLInputElement;
    const fpsInput = getByLabelText("FPS") as HTMLInputElement;
    const saveButton = getByText("Save Changes");

    fireEvent.change(projectNameInput, {
      target: { value: "New Project Name" },
    });
    fireEvent.change(widthInput, { target: { value: "1280" } });
    fireEvent.change(heightInput, { target: { value: "720" } });
    fireEvent.change(fpsInput, { target: { value: "30" } });
    fireEvent.click(saveButton);

    expect(setProjectFile).toHaveBeenCalledWith({
      ...projectFile,
      name: "New Project Name",
      settings: {
        width: 1280,
        height: 720,
        fps: 30,
      },
    });
  });

  test("closes the dialog on form submission", () => {
    const setOpen = jest.fn();
    const { getByText } = render(
      <ProjectSettings
        open={true}
        setOpen={setOpen}
        projectFile={projectFile}
        setProjectFile={setProjectFile}
      />
    );

    const saveButton = getByText("Save Changes");
    fireEvent.click(saveButton);

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
