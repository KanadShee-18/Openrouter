import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { ApiKeyService } from "./service";
import { ApiKeyModel } from "./model";

export const apiKey = new Elysia({ prefix: "/api-keys" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET as string,
    }),
  )
  .resolve(async ({ cookie: { auth }, status, jwt }) => {
    if (!auth) {
      return status(401);
    }
    const decoded = await jwt.verify(auth.value as string);

    if (!decoded || !decoded.userId) {
      return status(401, {
        message: "User is unauthenticated!",
      });
    }

    return {
      userId: decoded.userId,
    };
  })
  .get("/", async ({ userId }) => {
    const apiKeys = await ApiKeyService.getApiKeys(userId as string);
    return {
        apiKeys: apiKeys
    };
  }, {
    response: {
        200: ApiKeyModel.getApiKeyResponseSchema
    }
  })
  .post(
    "/",
    async ({ body, userId, status }) => {
      try {
        if (!userId) {
          return status(400, {
            message: "UNAUTHORIZED!",
          });
        }
        const { id, apiKey } = await ApiKeyService.createApiKey(
          body.name,
          userId as string,
        );
        return {
          id,
          apiKey,
        };
      } catch (error) {
        return status(400, {
          message: "Failed to create API Key",
        } satisfies ApiKeyModel.createApiKeyFailedSchema);
      }
    },
    {
      body: ApiKeyModel.createApiKeySchema,
      response: {
        200: ApiKeyModel.createApiKeyResponse,
        400: ApiKeyModel.createApiKeyFailedSchema,
      },
    },
  )
  .post("/disable", async () => {})
  .delete("/", async () => {});
