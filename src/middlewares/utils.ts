import {} from "stream";
import { inMemoryCache } from "../services/services";

export const ipCache = (ipAddress: string) => {
  const isSet = inMemoryCache.has(ipAddress);
  if (!isSet) inMemoryCache.set(ipAddress, 1);
  else {
    const count = inMemoryCache.get(ipAddress) as number;
    inMemoryCache.set(ipAddress, count + 1);
  }
};
