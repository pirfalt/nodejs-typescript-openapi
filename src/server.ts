import fastify, { FastifyInstance, RouteHandlerMethod } from "fastify";
import inputValidation from "openapi-validator-middleware";
import { createFastifyHandler, createFastifyPath } from "./adapters/server";
import createOrderDB from "./datasources/order-db";
import createPetDB from "./datasources/pet-db";
import { API } from "./routes/types";
import createPetHandler from "./routes/pet-handler";
import createStoreHandler from "./routes/store-handler";
import createUserHandler from "./routes/user-handler";
import createStoreService from "./services/store-service";

async function start() {
  const { PORT = 3000 } = process.env;

  const server = fastify({ logger: true });
  try {
    await setup(server);
    await server.listen(PORT);

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    server.log.info(`started on: ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

async function setup(server: FastifyInstance) {
  // Handler outside of openapi
  server.get("/ping", async (request, reply) => {
    return { pong: "it worked!" };
  });

  // Openapi to fastify "integration"
  {
    const api = await createAPI();

    const specificationPath = "specification/petstore-openapi.yaml";
    const basePath = "/api/v3";

    // Third party input validation library
    {
      inputValidation.init(specificationPath, {
        framework: "fastify",
      });

      server.register(
        inputValidation.validate({
          skiplist: ["/ping", "^/_metrics$"],
        })
      );
      server.setErrorHandler(async (err, req, reply) => {
        if (err instanceof inputValidation.InputValidationError) {
          return reply.status(400).send(err.errors);
        }
        throw err;
      });
    }

    // Connecting the `API` with fastify
    for (const [routePath, handlers] of Object.entries(api)) {
      const path = createFastifyPath(`${basePath}${routePath}`);
      for (const [method, methodHandler] of Object.entries(handlers)) {
        const handler = createFastifyHandler(methodHandler);
        const _server = server as any;
        _server[method](path, handler);
        // console.log({ method, path });
      }
    }
  }
}

async function createAPI(): Promise<API> {
  // Data sources
  const petDB = await createPetDB();
  const orderDB = await createOrderDB();

  // Services
  // const petService = createPetService(petDB); // Skipped for demo purpose
  const storeService = createStoreService(orderDB, petDB);

  // Route handlers
  const petHandler = createPetHandler(petDB);
  const storeHandler = createStoreHandler(storeService);
  const userHandler = createUserHandler();

  // Combine all route handlers into `API`
  const api: API = {
    ...petHandler,
    ...storeHandler,
    ...userHandler,
  };
  return api;
}

start();
