import { RequestHandler } from "express";
import { logger } from "./src/middlewares/logger";
import { LOGGER_FILE } from "./src/utils/constants";
import { ipTracker } from "./src/middlewares/IpTracker";

export const expressIpBlocker: RequestHandler = (...handlerParams) => {
  logger("combined", LOGGER_FILE)(...handlerParams);
  ipTracker(...handlerParams);
  const next = handlerParams[2];
  next();
};
