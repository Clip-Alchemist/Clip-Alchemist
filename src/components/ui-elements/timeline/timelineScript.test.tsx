import { render, fireEvent } from "@testing-library/react";
import TimelineScript from "./timelineScript";
import { Script } from "@/types/projectFile";

describe("TimelineScript", () => {
  const script: Script = {
    name: "Script 1",
    id: "xxxxxxxx-xxxx-xxxx-4xxx-xxxxxxxxxxxx",
    start: 0,
    length: 5,
    layer: 0,
    extension: "test.extension",
    "position.x": 0,
    "position.y": 0,
  };

  const setScripts = jest.fn();
  const scripts = [script];
  const zoomSize = 1;
  const fps = 30;
  const activeScript = "xxxxxxxx-xxxx-xxxx-4xxx-xxxxxxxxxxxx";
  const setActiveScript = jest.fn();

  test("renders without errors", () => {
    render(
      <TimelineScript
        script={script}
        setScripts={setScripts}
        scripts={scripts}
        zoomSize={zoomSize}
        fps={fps}
        activeScript={activeScript}
        setActiveScript={setActiveScript}
      />
    );
  });

  // test("updates scripts on mouse move", () => {
  //   const { getByText } = render(
  //     <TimelineScript
  //       script={script}
  //       setScripts={setScripts}
  //       scripts={scripts}
  //       zoomSize={zoomSize}
  //       fps={fps}
  //       activeScript={activeScript}
  //       setActiveScript={setActiveScript}
  //     />
  //   );
  //   const timelineScript = getByText("Script 1");

  //   fireEvent.mouseDown(timelineScript, { clientX: 0, clientY: 0 });
  //   fireEvent.mouseMove(window, { clientX: 100, clientY: 10 });

  //   expect(setScripts).toHaveBeenCalledWith([
  //     {
  //       ...script,
  //       start: 3.3333333333333335,
  //       layer: 3,
  //     },
  //   ]);
  // });

  test("resets isActive and cursor style on mouse up", () => {
    const { getByText } = render(
      <TimelineScript
        script={script}
        setScripts={setScripts}
        scripts={scripts}
        zoomSize={zoomSize}
        fps={fps}
        activeScript={activeScript}
        setActiveScript={setActiveScript}
      />
    );
    const timelineScript = getByText("Script 1");

    fireEvent.mouseDown(timelineScript, { clientX: 0, clientY: 0 });
    fireEvent.mouseUp(window);

    expect(timelineScript.classList.contains("active")).toBeFalsy();
    expect(document.body.style.cursor).toBe("auto");
  });
});
