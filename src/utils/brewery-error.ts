import ErrorBase from "./Error-base";

type ErrorName = "URI_ERROR" | "TYPE_ERROR" | "ERROR";

export class BreweryError extends ErrorBase<ErrorName> {
  constructor({
    name,
    message,
    cause,
  }: {
    name: ErrorName;
    message: string;
    cause?: any;
  }) {
    super({ name, message, cause });
  }
}
