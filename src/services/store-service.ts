import { DB } from "../datasources/db";
import { components } from "../openapi-types";
import {
  ServiceResponseCreate,
  ServiceResponseDelete,
  ServiceResponseRead,
  ServiceResponseQuery,
} from "./types";

type Order = components["schemas"]["Order"];
type Pet = components["schemas"]["Pet"];

export type StoreService = ReturnType<typeof createStoreService>;

export default function createStoreService(orderDB: DB<Order>, petDB: DB<Pet>) {
  async function getInventory(): ServiceResponseQuery<{
    available: number;
    pending: number;
    sold: number;
  }> {
    const result = {
      available: 0,
      pending: 0,
      sold: 0,
    };
    for await (const pet of petDB.scan()) {
      if (pet.status != null) {
        result[pet.status] += 1;
      }
    }
    return result;
  }

  async function placeOrder(order: Order): ServiceResponseCreate<Order> {
    if (order.id == 0) {
      return { type: "INVALID_INPUT" };
    }

    const createdOrder = await orderDB.add(order);
    return {
      type: "OK",
      value: createdOrder,
    };
  }

  async function getOrderById(id: number): ServiceResponseRead<Order> {
    const order = await orderDB.get(id);

    if (order == null) {
      return { type: "NOT_FOUND" };
    }

    return {
      type: "OK",
      value: order,
    };
  }

  async function deleteOrder(id: number): ServiceResponseDelete {
    const order = await orderDB.delete(id);

    if (order == null) {
      return { type: "NOT_FOUND" };
    }

    return {
      type: "OK",
      value: true,
    };
  }

  return { getInventory, placeOrder, getOrderById, deleteOrder };
}
