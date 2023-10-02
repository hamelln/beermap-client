import { rest } from "msw";
import { mockBrewery } from "../resolvers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3008";

export const fetchBreweryListByInputText = rest.post(
  `${BASE_URL}`,
  mockBrewery
);
