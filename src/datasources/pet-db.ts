import { components } from "../openapi-types";
import createDB from "./db";

type Pet = components["schemas"]["Pet"];

export default function createPetDB() {
  return createDB<Pet>();
}
