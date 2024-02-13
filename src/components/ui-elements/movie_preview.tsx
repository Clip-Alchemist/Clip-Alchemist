export default function MoviePreview({
  w = 1920,
  h = 1080,
}: Readonly<{ w?: number; h?: number }>) {
  return (
    <div className="w-full h-full flex items-center">
      <canvas
        width={w}
        height={h}
        className="max-w-full max-h-full bg-[#232323] m-auto"
      />
    </div>
  );
}
