import { RequestHandler } from "express";
import requestIp from "request-ip";
import log from "loglevel";
import { logger } from "./src/utils";
import { ipTracker } from "./ipTracker";
import "./src/config";

type IIpBlockerOptions = {
  loggerFile?: string;
};

export const ipBlocker =
  (options = {} as IIpBlockerOptions): RequestHandler =>
  (...handlerParams) => {
    const { loggerFile } = options;

    const [request, , next] = handlerParams;
    const ipAddress = requestIp.getClientIp(request) || "";
    log.info(`${ipAddress} logged in`);
    if (loggerFile) logger(loggerFile)(...handlerParams);
    ipTracker(...handlerParams);
    next();
  };
