import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import { api } from "~/utils/api";
import { type Record } from "@prisma/client";
import BestTimer from "./BestTimer";
import PastRecords from "./PastRecords";
import { useSession } from "next-auth/react";

const Best = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const utils = api.useContext();

  const { data: records, isLoading: loadingRecords } =
    api.record.getByUserId.useQuery();

  const session = useSession();

  const { mutate: uploadRecord, isLoading: submittingRecord } =
    api.record.create.useMutation({
      onMutate: async (timing) => {
        const newRecord: Record = {
          id: "holder",
          userId: session.data?.user.id ?? "holder",
          milliseconds: timing.milliseconds,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await utils.record.getAll.cancel();
        const prevData = utils.record.getAll.getData();
        utils.record.getByUserId.setData(undefined, (old) => {
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
        isLoading={submittingRecord}
        toggleTimerHandler={timerToggleHandler}
      />
      <PastRecords records={records} isLoading={loadingRecords} />
    </>
  );
};

export default Best;
