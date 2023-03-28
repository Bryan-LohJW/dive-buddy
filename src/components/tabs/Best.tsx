import { type FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import dayjs from "dayjs";
import { type Record } from "@prisma/client";
import Spinner from "../ui/Spinner";

type BestTimerProps = {
  timeInMs: number;
  isRunning: boolean;
  loading: boolean;
  toggleTimerHandler: () => Promise<void>;
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

  const showProgressToggleHandler = () => {
    setShowProgress((prev) => !prev);
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
          setClickEffect(true);
          void toggleTimerHandler().then();
        }}
        onAnimationEnd={() => setClickEffect(false)}
        disabled={loading}
        className={`h-14 w-44 rounded-3xl bg-primary text-2xl font-semibold text-secondary ${
          clickEffect ? "animate-shrink" : ""
        }`}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const PastRecords: FC<PastRecordsProps> = ({ records, loading }) => {
  if (loading) {
    return (
      <div className="mx-auto">
        <Spinner size={"h-28 w-28"} />
      </div>
    );
  }

  if (!records) return <div className="mx-auto">Something went wrong</div>;

  return (
    <div className="mx-3 overflow-y-scroll rounded-md border-2 border-gray-300 bg-gray-300">
      {records.map((record) => {
        const minutes = (
          "0" + Math.floor((record.milliseconds / 60000) % 10).toString()
        ).slice(-2);
        const seconds = (
          "0" + Math.floor((record.milliseconds / 1000) % 60).toString()
        ).slice(-2);
        const milliseconds = (
          "0" + Math.floor((record.milliseconds / 10) % 100).toString()
        ).slice(-2);
        const date = dayjs(record.createdAt).format("DD/MMM/YYYY");
        return (
          <div
            key={record.id}
            className="flex justify-evenly border-b-2 border-black p-2"
          >
            <p className="text-lg">
              {minutes}:{seconds}:{milliseconds}
            </p>
            <p className="text-lg">{date}</p>
          </div>
        );
      })}
    </div>
  );
};

const Best = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const { mutateAsync: uploadRecord, isLoading: submittingRecord } =
    api.record.create.useMutation();

  const {
    data: records,
    isLoading: loadingRecords,
    refetch: reloadRecord,
    isRefetching: refetchingRecords,
  } = api.record.getByUserId.useQuery();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const timerToggleHandler = async () => {
    setIsRunning((prev) => !prev);
    if (isRunning && time > 0) {
      console.log("hi");
      void (await uploadRecord({ milliseconds: time }));
      void (await reloadRecord());
    } else {
      setTime(0);
    }
  };
  console.log(loadingRecords, refetchingRecords, submittingRecord);
  return (
    <>
      <BestTimer
        timeInMs={time}
        isRunning={isRunning}
        loading={
          loadingRecords ||
          (refetchingRecords && !isRunning) ||
          submittingRecord
        }
        toggleTimerHandler={timerToggleHandler}
      />

      <PastRecords
        records={records}
        loading={
          loadingRecords ||
          (refetchingRecords && !isRunning) ||
          submittingRecord
        }
      />
    </>
  );
};

export default Best;
