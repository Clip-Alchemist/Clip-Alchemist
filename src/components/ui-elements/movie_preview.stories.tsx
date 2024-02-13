import { JSX } from "react";
import MoviePreview from "./movie_preview";

export default {
  title: "ui-elements/movie_preview",
  component: MoviePreview,
  argTypes: {
    w: { control: "number", defaultValue: 1920 },
    h: { control: "number", defaultValue: 1080 },
  },
};
export const movie_preview = (
  args: JSX.IntrinsicAttributes & Readonly<{ w: number; h: number }>
) => <MoviePreview {...args} />;
