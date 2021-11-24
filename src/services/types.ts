type Ok<T> = {
  type: "OK";
  value: T;
};

type NotFound = {
  type: "NOT_FOUND";
};

type InvalidInput = {
  type: "INVALID_INPUT";
};

// Expected errors should be of known types, unexpected are thrown.
// export type Error = {
//   type: "ERROR";
// };

export type ServiceResponseRead<T> = Promise<Ok<T> | NotFound>;
export type ServiceResponseQuery<T> = Promise<T>;
export type ServiceResponseCreate<T> = Promise<Ok<T> | InvalidInput>;
export type ServiceResponseUpdate<T> = Promise<Ok<T> | InvalidInput | NotFound>;
export type ServiceResponseDelete = Promise<Ok<true> | NotFound>;
