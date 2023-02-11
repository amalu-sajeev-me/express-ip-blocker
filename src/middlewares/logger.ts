import { RequestHandler } from "express";
import { createWriteStream } from "fs";
import { Writable } from "stream";
import morgan from "morgan";
import { ILoggerParams } from "./types";
import { outputFileStream } from "../streams/outputFile.stream";

export const logger = (...params: ILoggerParams): RequestHandler => {
  return (...handlerParams) => {
    const [logType, filePath] = params;
    const morganOptions: Parameters<typeof morgan>[1] = {
      immediate: true,
      stream: outputFileStream(filePath),
    };
    morgan(logType, morganOptions)(...handlerParams);
    handlerParams[2]();
  };
};
