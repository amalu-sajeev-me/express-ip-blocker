import { ICronDelay } from "../utils/types";

export const cronJob = (
  delayType: ICronDelay,
  timeFrame: number,
  job: () => void
) => {
  let delay = 1;
  switch (delayType) {
    case "seconds":
      delay = delay * 1000;
      break;
    case "minutes":
      delay = delay * 1000 * 60;
      break;
    case "hours":
      delay = delay * 1000 * 60 * 60;
      break;
    case "days":
      delay = delay * 1000 * 60 * 24;
      break;
    case "weeks":
      delay = delay * 1000 * 60 * 24 * 7;
      break;
    case "months":
      delay = delay * 1000 * 60 * 24 * 30;
      break;
    default:
      0;
      break;
  }
  const id = setInterval(job, delay * timeFrame);
  return { stopJob: () => clearInterval(id) };
};
