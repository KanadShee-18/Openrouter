import { prisma } from "db";

export abstract class ModelService {
  static async getModels() {
    const models = await prisma.model.findMany({
      include: {
        company: true,
      },
    });

    return models.map((model) => ({
      id: model.id,
      name: model.name,
      slug: model.slug,
      company: {
        id: model.company.id,
        name: model.company.name,
        website: model.company.websiteUrl,
      },
    }));
  }

  static async getProviders() {
    const providers = await prisma.provider.findMany();

    return providers.map((provider) => ({
      id: provider.id,
      name: provider.name,
      website: provider.websiteUrl,
    }));
  }

  static async getModelProviders(modelId: string) {
    const mappings = await prisma.modelProviderMapping.findMany({
      where: {
        modelId,
      },
      include: {
        provider: true,
      },
    });

    return mappings.map((mapping) => ({
      id: mapping.id,
      providerId: mapping.provider.id,
      providerName: mapping.provider.name,
      providerWebsite: mapping.provider.websiteUrl,
      inputTokenCost: mapping.inputTokenCost,
      outputTokenCost: mapping.outputTokenCost,
    }));
  }
}
