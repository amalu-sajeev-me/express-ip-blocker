import log from "loglevel";
import DataStore from "nedb";
import { PromiseCallback } from "../utils/types";
import { DB_PATH } from "../utils/constants";
import { IDataStore } from "./types";

export const db = new DataStore<IDataStore>({
  filename: DB_PATH,
  autoload: true,
  timestampData: true,
});
db.on("compaction.done", () => {
  log.info("Compaction");
});

export namespace Node_DB {
  export const fetchOne = (ip: string) => {
    const fetchOnePromise: PromiseCallback = (resolve, reject) => {
      db.findOne({ _ip: ip }, (error, document) => {
        if (!error) resolve(document);
        else reject(error);
      });
    };
    return new Promise(fetchOnePromise);
  };

  export const insertOne = (item: IDataStore) => {
    const insertOnePromise: PromiseCallback = (resolve, reject) => {
      db.insert(item, (error, newDocument) => {
        if (!error) resolve(newDocument);
        else reject(error);
      });
    };
    return new Promise(insertOnePromise);
  };

  export const doesExist = async (ip: string): Promise<boolean> => {
    try {
      const document = await fetchOne(ip);
      if (document) return true;
    } catch (_) {
      log.info("error fetching data from NODE_DB");
    }
    return false;
  };

  export const count = (ip: string) => {
    return new Promise((res, rej) => {
      db.count({ _ip: ip }).exec((err, count) => {
        if (err) rej(err);
        else res(count);
      });
    });
  };
}
