import express from "express";
import { ipBlocker } from "./index";
const logFile = `${process.cwd()}/log.txt`;

express()
  .use(
    ipBlocker({
      loggerFile: logFile,
    })
  )
  .listen(3003);
