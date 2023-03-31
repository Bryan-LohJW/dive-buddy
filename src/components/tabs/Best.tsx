import { type FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";

import { api } from "~/utils/api";
import { type Record } from "@prisma/client";

type BestTimerProps = {
  timeInMs: number;
  isRunning: boolean;
  loading: boolean;
  toggleTimerHandler: () => void;
};

type PastRecordsProps = {
  records: Record[] | undefined;
  loading: boolean;
};

const BestTimer: FC<BestTimerProps> = ({
  timeInMs,
  isRunning,
  loading,
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

  const minutes = ("0" + Math.floor((timeInMs / 60000) % 10).toString()).slice(
    -2
  );
  const seconds = ("0" + Math.floor((timeInMs / 1000) % 60).toString()).slice(
    -2
  );
  const milliseconds = (
    "0" + Math.floor((timeInMs / 10) % 100).toString()
  ).slice(-2);

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
              ? `${minutes}:${seconds}:${milliseconds}`
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
        disabled={loading}
        className={`h-14 w-44 rounded-lg bg-primary text-2xl font-semibold text-secondary ${
          clickEffect ? "animate-shrink" : ""
        }`}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const PastRecords: FC<PastRecordsProps> = ({ records, loading }) => {
  dayjs.extend(RelativeTime);

  if (!records && !loading)
    return <div className="mx-auto">Something went wrong</div>;

  return (
    <div className="mx-3 overflow-y-scroll rounded-md border-2 border-slate-200 bg-slate-100 shadow-md">
      {loading && (
        <>
          <div className="border-b-2 border-black py-2 px-6">
            <Skeleton />
          </div>
          <div className="border-b-2 border-black py-2 px-6">
            <Skeleton />
          </div>
          <div className="border-b-2 border-black py-2 px-6">
            <Skeleton />
          </div>
        </>
      )}
      {!loading &&
        records &&
        records.map((record) => {
          let displayTime = "";
          if (
            Date.now().valueOf() - record.createdAt.valueOf() <
            1000 * 60 * 60 * 24 * 7
          ) {
            displayTime = dayjs(record.createdAt).fromNow();
          } else {
            displayTime = dayjs(record.createdAt).format("DD MMM YYYY");
          }

          const minutes = (
            "0" + Math.floor((record.milliseconds / 60000) % 10).toString()
          ).slice(-2);
          const seconds = (
            "0" + Math.floor((record.milliseconds / 1000) % 60).toString()
          ).slice(-2);
          const milliseconds = (
            "0" + Math.floor((record.milliseconds / 10) % 100).toString()
          ).slice(-2);

          return (
            <div
              key={record.id}
              className="flex justify-between border-b-2 border-black py-2 px-6"
            >
              <p className="text-lg">
                {minutes}:{seconds}:{milliseconds}
              </p>
              <p className="text-lg">{displayTime}</p>
            </div>
          );
        })}
    </div>
  );
};

const Best = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const utils = api.useContext();

  const { data: records, isLoading: loadingRecords } =
    api.record.getByUserId.useQuery();

  const { mutate: uploadRecord, isLoading: submittingRecord } =
    api.record.create.useMutation({
      onMutate: async (timing) => {
        const newRecord: Record = {
          id: "holder",
          userId: "holder",
          milliseconds: timing.milliseconds,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await utils.record.getAll.cancel();
        const prevData = utils.record.getAll.getData();
        utils.record.getByUserId.setData(undefined, (old) => {
          console.log(old);
          if (old === undefined) {
            return [newRecord];
          }
          return [newRecord, ...old];
        });
        return { prevData };
      },
      onError: () => {
        utils.record.getByUserId.setData(
          undefined,
          utils.record.getAll.getData()
        );
      },
      onSettled: async () => {
        await utils.record.getByUserId.invalidate();
      },
    });

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const timerToggleHandler = () => {
    setIsRunning((prev) => !prev);
    if (isRunning && time > 0) {
      void uploadRecord({ milliseconds: time });
    } else {
      setTime(0);
    }
  };
  return (
    <>
      <BestTimer
        timeInMs={time}
        isRunning={isRunning}
        loading={submittingRecord}
        toggleTimerHandler={timerToggleHandler}
      />
      <PastRecords records={records} loading={loadingRecords} />
    </>
  );
};

export default Best;
