import NodeCache from "node-cache";
import { inMemoryCacheOptions } from "./config";
export const inMemoryCache = new NodeCache(inMemoryCacheOptions);
