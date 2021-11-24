import { RouteHandler } from "./types";

export default function createUserHandler(): RouteHandler<
  | "/user"
  | "/user/createWithList"
  | "/user/login"
  | "/user/logout"
  | "/user/{username}"
> {
  return {
    "/user": {
      async post() {
        throw new Error("Not implemented");
      },
    },
    "/user/createWithList": {
      async post() {
        throw new Error("Not implemented");
      },
    },
    "/user/login": {
      async get() {
        throw new Error("Not implemented");
      },
    },
    "/user/logout": {
      async get() {
        throw new Error("Not implemented");
      },
    },
    "/user/{username}": {
      async get() {
        throw new Error("Not implemented");
      },
      async put() {
        throw new Error("Not implemented");
      },
      async delete() {
        throw new Error("Not implemented");
      },
    },
  };
}
