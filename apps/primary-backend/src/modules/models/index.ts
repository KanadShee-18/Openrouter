import Elysia from "elysia";
import { ModelService } from "./service";
import { ModelsModel } from "./model";

export const payment = new Elysia({ prefix: "/models" })
  .get(
    "/",
    async () => {
      const models = await ModelService.getModels();
      return {
        models,
      };
    },
    {
      response: {
        200: ModelsModel.getModelsResponseSchema,
      },
    },
  )
  .get(
    "/providers",
    async () => {
      const providers = await ModelService.getProviders();
      return {
        providers,
      };
    },
    {
      response: {
        200: ModelsModel.getProvidersResponseSchema,
      },
    },
  )
  .get(
    "/:id/providers",
    async ({ params: { id } }) => {
      const providers = await ModelService.getModelProviders(id);
      return {
        providers,
      };
    },
    {
      response: {
        200: ModelsModel.getModelProviderResponseSchema,
      },
    },
  );
