import { RequestHandler } from "express";
import requestIp from "request-ip";
import { inMemoryCache } from "../services/services";
import { ipCache } from "./utils";
import { IP_REQUEST_THRESHOLD } from "../utils/constants";
import { Node_DB } from "../db/db";
import { IDataStore } from "../db/types";
import log from "loglevel";

export const ipTracker: RequestHandler = async (...handlerParams) => {
  const [request, response, next] = handlerParams;
  const ipAddress = requestIp.getClientIp(request) || "";
  ipCache(ipAddress);
  const document: Partial<IDataStore> = {
    _ip: ipAddress,
  };
  try {
    //   if (!(await Node_DB.doesExist(document))) Node_DB.insertOne(document);

    const doesExist = await Node_DB.count(ipAddress);
    console.log("lolo", { doesExist });
    if (!doesExist)
      Node_DB.insertOne({ _ip: ipAddress, timeStamp: new Date() });

    console.log({ lolo: Node_DB.count(ipAddress) });
    if ((inMemoryCache.get(ipAddress) as number) > IP_REQUEST_THRESHOLD) {
      response.sendStatus(403).end();
    } else next();
  } catch (err) {
    log.info(`error in ip-tracker`);
  }
};
