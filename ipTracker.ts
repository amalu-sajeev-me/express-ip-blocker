import { RequestHandler } from "express";
import requestIp from "request-ip";
import { ipCache } from "./src/utils";
import { inMemoryCache } from "./src/services";

export const ipTracker: RequestHandler = (request, response, next) => {
  const ipAddress = requestIp.getClientIp(request) || "";
  ipCache(ipAddress);
  if ((inMemoryCache.get(ipAddress) as number) > 5) {
    return response.sendStatus(403).end();
  } else next();
};
