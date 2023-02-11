export type ILogTypes = "combined" | "common" | "dev" | "short" | "tiny";

export type ICronDelay =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months";

export type PromiseCallback<T = unknown> = (
  resolve: (fullfilled: T) => void,
  reject: (rejected: unknown | never) => void
) => void;
