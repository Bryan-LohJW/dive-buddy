/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const BestTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [clickEffect, setClickEffect] = useState(false);

  const { mutate, isLoading: submittingRecord } =
    api.record.create.useMutation();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = ("0" + Math.floor((time / 60000) % 10).toString()).slice(-2);
  const seconds = ("0" + Math.floor((time / 1000) % 60).toString()).slice(-2);
  const milliseconds = ("0" + Math.floor((time / 10) % 100).toString()).slice(
    -2
  );

  const percentOfMin =
    (+Math.floor((time / 1000) % 60)
      .toString()
      .slice(-2) /
      60) *
    100;

  const timerToggleHandler = () => {
    if (isRunning && time > 0) {
      mutate({ milliseconds: time });
    } else {
      setTime(0);
    }
    setIsRunning((prev) => !prev);
  };

  const showProgressToggleHandler = () => {
    if (isRunning) {
      setShowProgress((prev) => !prev);
    }
  };

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
            x={showProgress ? "5.7" : "5"}
            y="20.35"
            textAnchor="left"
            className="text-[6px] font-semibold"
            onClick={showProgressToggleHandler}
          >
            {showProgress
              ? `${minutes}:${seconds}:${milliseconds}`
              : "-- : -- : --"}
          </text>
        </svg>
      </div>

      <button
        onClick={() => {
          timerToggleHandler();
          setClickEffect(true);
        }}
        onAnimationEnd={() => setClickEffect(false)}
        className={`h-14 w-44 rounded-3xl bg-primary text-2xl font-semibold text-secondary ${
          clickEffect ? "animate-shrink" : ""
        }`}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      {submittingRecord && <p>Loading</p>}
    </div>
  );
};
export default BestTimer;
