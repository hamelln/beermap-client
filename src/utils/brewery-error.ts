import ErrorBase from "./Error-base";

type ErrorName = "URI_ERROR" | "TYPE_ERROR" | "ERROR";

export class BreweryError extends ErrorBase<ErrorName> {}
