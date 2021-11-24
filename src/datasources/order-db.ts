import { components } from "../openapi-types";
import createDB from "./db";

type Order = components["schemas"]["Order"];

export default function createOrderDB() {
  return createDB<Order>();
}
