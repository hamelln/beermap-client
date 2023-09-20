interface ErrorProps<T> {
  name: T;
  message: string;
  cause?: any;
}

export default class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause?: any;

  constructor({ name, message, cause }: ErrorProps<T>) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
