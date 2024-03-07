import { ProjectFile } from "@/types/projectFile";

export default function Timeline({
  timelineData,
}: {
  timelineData?: ProjectFile["scenes"];
}) {
  return (
    <div className="w-full h-full overflow-scroll hidden-scrollbar">
      <div className="w-max">
        <div className="flex h-6 inset-x-0 sticky top-0 bg-gray-50 z-10">
          <select
            className="flex-none w-20 sticky top-0 left-0 z-20"
            defaultValue={0}
          >
            <option value={0}>root</option>
            {new Array(100).fill(0).map((_, i) => (
              <option key={i} value={i + 1}>
                Scene{i + 1}
              </option>
            ))}
          </select>
          <div className="flex-1 flex">
            {new Array(100).fill(0).map((_, i) => (
              <div key={i} className="flex-none w-20 text-center">
                {("00" + Math.floor(i / 3600)).slice(-2)}:
                {("00" + Math.floor(i / 60)).slice(-2)}:
                {("00" + (i % 60)).slice(-2)}
              </div>
            ))}
          </div>
        </div>
        <div>
          {new Array(25).fill(0).map((_, i) => (
            <div key={i} className="flex odd:bg-gray-100">
              <button className="flex-none h-full w-20 text-center py-2  sticky left-0">
                Layer{i + 1}
              </button>
              <div className="flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
