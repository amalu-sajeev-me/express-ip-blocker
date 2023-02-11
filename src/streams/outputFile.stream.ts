import { createWriteStream } from "fs";

const outputFileStreamOptions: Parameters<typeof createWriteStream>[1] = {
  flags: "a",
};

export const outputFileStream = (filePath: string) => {
  return createWriteStream(filePath, outputFileStreamOptions);
};
