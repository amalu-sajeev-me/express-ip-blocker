import { RequestHandler } from "express";
import morgan from "morgan";
import { createWriteStream } from "fs";
import { ICronDelay, ILogTypes } from "./types";
import { inMemoryCache } from "./services";
import log from "loglevel";

export const logger =
  (logFilePath: string, type: ILogTypes = "combined"): RequestHandler =>
  (...handlerParams) => {
    console.log("lolo", inMemoryCache.keys());
    const outStream = createWriteStream(logFilePath, { flags: "a" });
    morgan(type, { stream: outStream, immediate: true })(...handlerParams);
    log.info("Logging");
    const next = handlerParams[2];
    next();
  };

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

export const ipCache = (ipAddress: string) => {
  const isSet = inMemoryCache.has(ipAddress);
  if (!isSet) inMemoryCache.set(ipAddress, 1);
  else {
    const count = inMemoryCache.get(ipAddress) as number;
    inMemoryCache.set(ipAddress, count + 1);
  }
};
