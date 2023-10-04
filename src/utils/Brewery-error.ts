import ErrorBase from "./Error-base";

type ErrorName =
  | "NOT_FOUND_ERROR"
  | "URI_ERROR"
  | "TYPE_ERROR"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "ERROR";

interface BreweryErrorConstructor {
  name: ErrorName;
  message: string;
  cause?: any;
}

export class BreweryError extends ErrorBase<ErrorName> {
  constructor({ name, message, cause }: BreweryErrorConstructor) {
    super({ name, message, cause });
  }
}
