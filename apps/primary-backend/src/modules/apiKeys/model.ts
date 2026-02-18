import { t } from "elysia";

export namespace ApiKeyModel {
  // Create Schema
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

  // Update Schema
  export const updateApiKeySchema = t.Object({
    id: t.String(),
    disabled: t.Boolean(),
  });

  export const updateApiKeyResponse = t.Object({
    message: t.Literal("API Key disabled status updated"),
  });
  export const updateApiKeyFailedResponse = t.Object({
    message: t.Literal("Failed to update API Key status"),
  });

  export type updateApiKeySchema = typeof updateApiKeySchema.static;
  export type updateApiKeyResponse = typeof updateApiKeyResponse.static;
  export type updateApiKeyFailedResponse =
    typeof updateApiKeyFailedResponse.static;

  // Get API Key Schema

  export const getApiKeyResponseSchema = t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        apiKey: t.String(),
        disabled: t.Boolean(),
        creditsConsumed: t.Number(),
        lastUsed: t.Nullable(t.Date()),
      }),
    ),
  });

  export type getApiKeyResponseSchema = typeof getApiKeyResponseSchema.static;

  // Delete API Key Schema

  export const deleteApiKeySchema = t.Object({
    id: t.String(),
  });

  export const deleteApiKeyResponse = t.Object({
    message: t.Literal("Deleted API Key Successfully"),
  });

  export const deleteApiKeyFailedResponse = t.Object({
    message: t.Literal("Failed in API Key Deletion"),
  });

  export type deleteApiKeySchema = typeof deleteApiKeySchema.static;
  export type deleteApiKeyResponse = typeof deleteApiKeyResponse.static;
  export type deleteApiKeyFailedResponse =
    typeof deleteApiKeyFailedResponse.static;
}
