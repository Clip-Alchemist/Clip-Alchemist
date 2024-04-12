import { render } from "@testing-library/react";
import TimeLineTime from "./timeLineTime";
import "@testing-library/jest-dom";

describe("TimeLineTime", () => {
  test("renders without errors", () => {
    render(<TimeLineTime time={90} />);
  });
  test("renders time correctly", () => {
    const { getByText } = render(<TimeLineTime time={90} />);
    expect(getByText("01:30:00")).toBeInTheDocument();
  });
  test("render time correctly if change time", async () => {
    const { getByText, rerender } = render(<TimeLineTime time={90} />);
    expect(getByText("01:30:00")).toBeInTheDocument();
    await new Promise(r => setTimeout(r, 1000));
    rerender(<TimeLineTime time={120} />);
    expect(getByText("02:00:00")).toBeInTheDocument();
  });
});
