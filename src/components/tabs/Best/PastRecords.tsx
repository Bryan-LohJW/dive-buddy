import { type FC } from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { type Record } from "@prisma/client";
import { formatDate } from "~/utils/timerFunctions";

type PastRecordsProps = {
  records: Record[] | undefined;
  isLoading: boolean;
};

const PastRecords: FC<PastRecordsProps> = ({ records, isLoading }) => {
  dayjs.extend(RelativeTime);

  if (!records && !isLoading)
    return <div className="mx-auto">Something went wrong</div>;

  return (
    <div className="mx-3 overflow-y-scroll rounded-md border-2 border-slate-200 bg-slate-100 shadow-md">
      {isLoading && (
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
      {!isLoading &&
        records &&
        records.map((record) => {
          const displayTime = formatDate(record.updatedAt);

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

export default PastRecords;
