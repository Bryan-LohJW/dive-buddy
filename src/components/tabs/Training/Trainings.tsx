import { api } from "~/utils/api";
import Training from "./Training";
import { TrainingType } from "@prisma/client";

const Trainings = () => {
  const { data: recordData, status } = api.record.getLatest.useQuery();

  if (status === "loading") return <div>Loading</div>;

  if (!recordData || status === "error") return <div>Error</div>;

  const typeEnums = TrainingType;

  // Todo: handle case where no records yet

  return (
    <>
      <Training
        title={"CO2 Training"}
        description={"Train your lung capacity"}
        trainingType={typeEnums.CO2}
        record={recordData?.milliseconds}
      />
      <Training
        title={"O2 Training"}
        description={"Train your lung capacity"}
        trainingType={typeEnums.O2}
        record={recordData?.milliseconds}
      />
    </>
  );
};

export default Trainings;
