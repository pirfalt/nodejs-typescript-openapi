import { StoreService } from "../services/store-service";
import { RouteHandler } from "./types";
import { notFoundResponse, okResponse } from "./http";

export default function createStoreHandler(
  storeService: StoreService
): RouteHandler<
  "/store/inventory" | "/store/order" | "/store/order/{orderId}"
> {
  return {
    "/store/inventory": {
      async get({}) {
        // Service call
        const inventory = await storeService.getInventory();

        // Response mapping
        return okResponse(inventory);
      },
    },

    "/store/order/{orderId}": {
      async get({ path }) {
        // Input
        const orderId = path.orderId;

        // Service call
        const order = await storeService.getOrderById(orderId);

        // Response mapping
        switch (order.type) {
          case "OK": {
            return okResponse(order.value);
          }
          case "NOT_FOUND": {
            return notFoundResponse(null);
          }
        }
      },
      async delete() {
        return notFoundResponse(null);
      },
    },

    "/store/order": {
      // TODO(demo): Find and fix the error
      async post({ requestBody }) {
        // Input
        const orderToCreate = requestBody.content["application/json"];

        // Service call
        const createdOrder = await storeService.placeOrder(orderToCreate);

        throw new Error("Bug below.");
        // // Response mapping
        // switch (createdOrder.type) {
        //   case "OK": {
        //     return okResponse(createdOrder.value);
        //   }
        //   case "INVALID_INPUT": {
        //     return badRequestResponse(null);
        //   }
        // }
      },
    },
  };
}
