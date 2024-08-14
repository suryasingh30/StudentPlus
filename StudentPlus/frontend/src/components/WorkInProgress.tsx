import { DivOrigami } from "./DivOrigami";
import { RevealLinks } from "./RevealLinks";

export const WorkInProgress = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-neutral-950">
      <div className="flex w-full max-w-4xl items-center justify-between mb-4">
        {/* Left Side: DivOrigami */}
        <div className="flex-shrink-0">
          <DivOrigami />
        </div>

        {/* Right Side: Work In Progress */}
        <div className="flex-grow text-right text-white font-bold text-6xl">
          Work In Progress
        </div>
      </div>

      {/* Below Section: RevealLinks */}
      <div className="w-full mt-8">
        <RevealLinks />
      </div>
    </div>
  );
};
