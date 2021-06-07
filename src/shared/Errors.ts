export class EmptyListError extends Error {
  constructor() {
    super("empty list");
  }
}

export class IllegalArgumentError extends Error {
  constructor() {
    super("illegal argument");
  }
}
