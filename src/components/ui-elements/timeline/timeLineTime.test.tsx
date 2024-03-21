import { render } from "@testing-library/react";
import TimeLineTime from "./timeLineTime";

describe("TimeLineTime", () => {
  test("renders without errors", () => {
    render(<TimeLineTime zoomSize={1} fps={30} />);
  });
});
