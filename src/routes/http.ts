type Status =
  | "200" // OK
  | "201" // Created
  | "308" // Permanent Redirect // | "301" // Moved Permanently
  | "307" // Temporary Redirect // | "302" // Found
  | "400" // Bad Request
  | "401" // Unauthorized
  | "403" // Forbidden
  | "404" // Not Found
  | "500" // Internal Server Error
  | "501"; // Not Implemented

type JSONResponse<S extends Status, T> = {
  [s in S]: {
    content: {
      "application/json": T;
    };
  };
};

// -- Success --

/**
 * `OK`
 */
export function okResponse<T>(value: T): JSONResponse<"200", T> {
  return { "200": { content: { "application/json": value } } };
}
/**
 * `Created` should only be returned from POST requests
 * when a resource have successfully been created.
 */
export function createdResponse<T>(value: T): JSONResponse<"201", T> {
  return { "201": { content: { "application/json": value } } };
}

// -- Redirect --

/**
 * `Permanent Redirect`
 */
export function permanentRedirectResponse<T>(value: T): JSONResponse<"308", T> {
  return { "308": { content: { "application/json": value } } };
}
/**
 * `Temporary Redirect`
 */
export function temporaryRedirectResponse<T>(value: T): JSONResponse<"307", T> {
  return { "307": { content: { "application/json": value } } };
}

// -- Client error --

/**
 * `BadRequest`
 */
export function badRequestResponse<T>(value: T): JSONResponse<"400", T> {
  return { "400": { content: { "application/json": value } } };
}
/**
 * `Unauthorized` is actually more like "unauthenticated".
 * This is the default response if the user is unable to be validated.
 *
 * The request can be retried with different user credentials (bearer token).
 */
export function unauthorizedResponse<T>(value: T): JSONResponse<"401", T> {
  return { "401": { content: { "application/json": value } } };
}
/**
 * `Forbidden` is the actual "unauthorized" response.
 * This user was validated and identified as not having access to the resource.
 *
 * The request should not be retried.
 */
export function forbiddenResponse<T>(value: T): JSONResponse<"403", T> {
  return { "403": { content: { "application/json": value } } };
}
/**
 * `NotFound` should only be returned when the requested address would uniquely
 * identify a resource, but it was not found.
 *
 * Simply put, if there request includes a path parameter you should expect
 * either the resource or `NotFound`.
 *
 * Should _never_ be returned when the expected resource is a collection.
 * Since a collection is never a uniq resource, and being empty is valid (`OK`).
 */
export function notFoundResponse<T>(value: T): JSONResponse<"404", T> {
  return { "404": { content: { "application/json": value } } };
}

// -- Server error --

/**
 * `InternalServerError` should never intentionally be returned by controller code.
 */
export function internalServerErrorResponse<T>(
  value: T
): JSONResponse<"500", T> {
  return { "500": { content: { "application/json": value } } };
}
/**
 * `NotImplemented` should never intentionally be returned by controller code.
 */
export function notImplementedResponse<T>(value: T): JSONResponse<"501", T> {
  return { "501": { content: { "application/json": value } } };
}
