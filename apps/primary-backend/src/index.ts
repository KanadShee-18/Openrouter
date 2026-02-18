import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import { apiKey } from "./modules/apiKeys";

const app = new Elysia().use(auth).use(apiKey).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

/**
 * auth -> sign up, sign in
 * api-key -> create, get, delete, disable api key
 * model -> get all the supported models, pricings, providers etc
 * payment -> rzp/stripe
 */
