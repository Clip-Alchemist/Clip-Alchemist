import { render, fireEvent } from "@testing-library/react";
import TimeLineBar from "./timeLineBar";

describe("TimeLineBar", () => {
  test("renders without errors", () => {
    render(<TimeLineBar zoomSize={1} />);
  });

  test("updates currentFrame on mouse move", () => {
    const { getByTestId } = render(<TimeLineBar zoomSize={1} />);
    const timelineBar = getByTestId("timeline-bar");

    fireEvent.mouseDown(timelineBar, { clientX: 0 });
    fireEvent.mouseMove(window, { clientX: 100 });

    expect(timelineBar.style.left).toBe("calc(5rem + 100px)");
  });

  test("resets isActive and cursor style on mouse up", () => {
    const { getByTestId } = render(<TimeLineBar zoomSize={1} />);
    const timelineBar = getByTestId("timeline-bar");

    fireEvent.mouseDown(timelineBar, { clientX: 0 });
    fireEvent.mouseUp(window);

    expect(timelineBar.classList.contains("active")).toBeFalsy();
    expect(document.body.style.cursor).toBe("auto");
  });
});
