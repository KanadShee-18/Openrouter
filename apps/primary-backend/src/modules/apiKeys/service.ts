import { prisma } from "db";
import { ApiKeyModel } from "./model";
import crypto from "crypto";

const CHAR_SET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const SUFFIX_KEY = "ko-ak-";

export abstract class ApiKeyService {
  static createRandomApiKey(): { apiKey: string } {
    // const apiKey = crypto.randomBytes(32).toString("hex");
    let apiKey = SUFFIX_KEY;
    for (let i = 0; i < 20; i++) {
      const randomCharIndex = Math.floor(Math.random() * CHAR_SET.length);
      apiKey += CHAR_SET[randomCharIndex];
    }
    return {
      apiKey,
    };
  }

  static async createApiKey(
    name: string,
    userId: string,
  ): Promise<{ id: string; apiKey: string }> {
    const { apiKey } = this.createRandomApiKey();
    const created = await prisma.apiKey.create({
      data: {
        name,
        userId,
        apiKey,
      },
    });

    return {
      id: created.id,
      apiKey,
    };
  }

  static async getApiKeys(userId: string) {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId,
      },
    });
    return apiKeys.map((apiKey) => ({
      id: apiKey.id,
      name: apiKey.name,
      apiKey: apiKey.apiKey,
      creditsConsumed: apiKey.creditsConsumed,
      lastUsed: apiKey.lastUsed,
    }));
  }
}
