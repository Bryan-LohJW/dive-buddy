import { api } from "~/utils/api";
import Training from "./Training";
import { TrainingType } from "@prisma/client";

const Trainings = () => {
  const { data: recordData, status } = api.record.getLatest.useQuery();

  if (status === "loading") return <div>Loading</div>;

  if (status === "error") return <div>Error</div>;

  const typeEnums = TrainingType;

  return (
    <>
      <Training
        title={"CO2 Training"}
        description={"Decreasing breathe times"}
        trainingType={typeEnums.CO2}
        record={recordData ? recordData.milliseconds : 0}
      />
      <Training
        title={"O2 Training"}
        description={"Increasing breath hold times"}
        trainingType={typeEnums.O2}
        record={recordData ? recordData.milliseconds : 0}
      />
    </>
  );
};

export default Trainings;
