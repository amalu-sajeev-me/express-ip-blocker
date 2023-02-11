import NodeCache from "node-cache";
import { inMemoryCacheOptions } from "../utils/config";
export const inMemoryCache = new NodeCache(inMemoryCacheOptions);
