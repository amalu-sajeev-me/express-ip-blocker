import NodeCache from "node-cache";
import { IN_MEMORY_MAX_KEYS, IN_MEMORY_VALIDITY } from "./constants";
import log from "loglevel";
export const inMemoryCacheOptions: NodeCache.Options = {
  deleteOnExpire: true,
  forceString: true,
  maxKeys: IN_MEMORY_MAX_KEYS,
  stdTTL: IN_MEMORY_VALIDITY,
};

log.setLevel("info");
