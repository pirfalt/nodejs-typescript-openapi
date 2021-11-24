import { RouteHandlerMethod } from "fastify";

export function createFastifyPath(openApiPath: string): string {
  const re = /\{([A-Za-z0-9_]+)\}/g;
  return openApiPath.replace(re, ":$1");
}

export function createFastifyHandler(
  methodHandler: Function
): RouteHandlerMethod {
  return async (request, reply) => {
    // Convert fastify request to openapi handler parameters
    const parameters = {
      path: request.params,
      query: request.query,
      header: request.headers,
      requestBody: {
        content: {
          [request.headers["content-type"] ?? "application/json"]: request.body,
        },
      },
    };

    // Run handler
    const result = await methodHandler(parameters as any);

    // Convert openapi handler result to fastify reply
    const resultStatuses = Object.keys(result);
    if (resultStatuses.length > 1) {
      throw new Error("Attempted to return multiple status codes");
    }
    const statusKey = resultStatuses[0];
    const status = Number.parseInt(statusKey, 10);
    const content = (result as any)[statusKey]?.content;

    // Send
    reply.code(status).send(content?.["application/json"]);
  };
}
