import express from "express";
import { logger } from "./src/middlewares/logger";
import { LOGGER_FILE } from "./src/utils/constants";
import { expressIpBlocker } from ".";

express().use(expressIpBlocker).listen(3003);
