import { type FC, useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";
import { formatTimeInMs } from "~/utils/timerFunctions";

type BestTimerProps = {
  timeInMs: number;
  isRunning: boolean;
  isLoading: boolean;
  toggleTimerHandler: () => void;
};

const BestTimer: FC<BestTimerProps> = ({
  timeInMs,
  isRunning,
  isLoading,
  toggleTimerHandler,
}) => {
  const [showProgress, setShowProgress] = useState(true);
  const [clickEffect, setClickEffect] = useState(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    if (lastVisit === null) {
      toast("Tap the timer to hide it", {
        duration: 5000,
        position: "top-center",
      });
    } else {
      if (
        new Date().valueOf() - Date.parse(lastVisit).valueOf() >
        1000 * 60 * 60 * 24 * 5
      ) {
        toast("Tap the timer to hide it", {
          duration: 5000,
          position: "top-center",
        });
      }
    }
    localStorage.setItem("lastVisit", new Date().toString());
  }, []);

  const [minutes, seconds, milliseconds] = formatTimeInMs(timeInMs);

  const percentOfMin =
    (+Math.floor((timeInMs / 1000) % 60)
      .toString()
      .slice(-2) /
      60) *
    100;

  return (
    <div className="text-center">
      <div className="mx-auto my-10 aspect-square h-52">
        <svg viewBox="0 0 36 36" className="h-full w-full">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            className="fill-none stroke-gray-300 stroke-2"
          />
          {showProgress && (
            <path
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              stroke-dasharray={`${percentOfMin}, 100`}
              strokeLinecap="round"
              className={`fill-none stroke-primary stroke-2 ${
                percentOfMin === 0
                  ? ""
                  : "transition-all duration-[1.1s] ease-linear"
              }`}
            />
          )}
          <text
            x={showProgress ? "5.4" : "5"}
            y="20.35"
            textAnchor="left"
            className="text-[6px] font-semibold"
            onClick={() => {
              setShowProgress((prev) => !prev);
            }}
          >
            {showProgress
              ? `${minutes!}:${seconds!}:${milliseconds!}`
              : "-- : -- : --"}
          </text>
        </svg>
      </div>
      <button
        onClick={() => {
          setClickEffect(true);
          void toggleTimerHandler();
        }}
        onAnimationEnd={() => setClickEffect(false)}
        disabled={isLoading}
        className={`h-14 w-44 rounded-lg bg-primary text-2xl font-semibold text-secondary ${
          clickEffect ? "animate-shrink" : ""
        }`}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default BestTimer;
