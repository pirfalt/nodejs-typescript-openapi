import { DB } from "../datasources/db";
import { components } from "../openapi-types";
import { RouteHandler } from "./types";

type Pet = components["schemas"]["Pet"];

function handlerExample(db: DB<Pet>): RouteHandler<"/pet"> {
  return {
    "/pet": {
      async post({ requestBody }) {
        // Request
        const inputPet = requestBody.content["application/json"];

        // "Logic"
        inputPet.id = undefined; // input will be given an id by the db when added
        const savedPet = await db.add(inputPet);

        // Response
        return {
          "200": {
            content: {
              "application/json": savedPet,
            },
          },
        };
      },

      async put({ requestBody }) {
        const updatedPet = requestBody.content["application/json"];

        // Should update the existing pet in the db before returning.

        return {
          "200": {
            content: {
              "application/json": updatedPet,
            },
          },
        };
      },
    },
  };
}

export default function createPetHandler(
  db: DB<Pet>
): RouteHandler<
  | "/pet"
  | "/pet/{petId}"
  | "/pet/{petId}/uploadImage"
  | "/pet/findByStatus"
  | "/pet/findByTags"
> {
  return {
    "/pet": {
      async post({ requestBody }) {
        // Request
        const inputPet = requestBody.content["application/json"];

        // "Logic"
        inputPet.id = undefined; // input will be given an id by the db when added
        const savedPet = await db.add(inputPet);

        // Response
        return {
          "200": {
            content: {
              "application/json": savedPet,
            },
          },
        };
      },

      async put({ requestBody }) {
        const updatedPet = requestBody.content["application/json"];

        // FIXME(demo): PUT method for `/pet`.
        // - Should update the existing pet in the db before returning.
        // - PUT should be moved to "/pet/{petId}" route.

        return {
          "200": {
            content: {
              "application/json": updatedPet,
            },
          },
        };
      },
    },

    "/pet/{petId}": {
      async get() {
        // FIXME(demo): Implement the handler.
        throw new Error("Not implemented");
      },

      async post() {
        // TODO(demo): Implement the specification or rewrite the spec after evaluation.
        throw new Error("Not implemented");
      },

      async delete() {
        // TODO(demo): Implement the specification.
        throw new Error("Not implemented");
      },
    },

    "/pet/{petId}/uploadImage": {
      async post({ path, query, requestBody }) {
        const petId = path.petId;
        const additionalMetadata = query.additionalMetadata;
        const content = requestBody.content["application/octet-stream"];

        return {
          "200": {
            content: {
              "application/json": {
                code: undefined,
                type: undefined,
                message: "unclear response type",
              },
            },
          },
        };
      },
    },

    "/pet/findByStatus": {
      async get() {
        throw new Error("Not implemented");
      },
    },

    "/pet/findByTags": {
      async get() {
        throw new Error("Not implemented");
      },
    },
  };
}

/*
  // preparedHandler
  async get({ path }) {
    const pet = await db.get(path.petId);
    if (pet == null) {
      return { "404": null };
    }
    return {
      "200": {
        content: {
          "application/json": pet,
        },
      },
    };
  },
*/
