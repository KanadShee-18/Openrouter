import { t } from "elysia";

export namespace ApiKeyModel {
  export const createApiKeySchema = t.Object({
    name: t.String(),
  });

  export const createApiKeyResponse = t.Object({
    id: t.String(),
    apiKey: t.String(),
  });

  export const createApiKeyFailedSchema = t.Object({
    message: t.String(),
  });

  export type createApiKeyFailedSchema = typeof createApiKeyFailedSchema.static;

  export type createApiKeySchema = typeof createApiKeySchema.static;
  export type createApiKeyResponse = typeof createApiKeyResponse.static;

  export const disableApiKeySchema = t.Object({
    id: t.String(),
  });

  export const disableApiKeyResponse = t.Object({
    message: t.Literal("Disabled API Key Successfully"),
  });

  export type disableApiKeySchema = typeof disableApiKeySchema.static;
  export type disableApiKeyResponse = typeof disableApiKeyResponse.static;

  export const getApiKeyResponseSchema = t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        apiKey: t.String(),
        creditsConsumed: t.Number(),
        lastUsed: t.Nullable(t.Date()),
      }),
    ),
  });

  export type getApiKeyResponseSchema = typeof getApiKeyResponseSchema.static;

  export const deleteApiKeySchema = t.Object({
    id: t.String(),
  });

  export const deleteApiKeyResponse = t.Object({
    message: t.Literal("Deleted API Key Successfully"),
  });

  export type deleteApiKeySchema = typeof disableApiKeySchema.static;
  export type deleteApiKeyResponse = typeof disableApiKeyResponse.static;
}
