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
        deleted: false,
      },
    });
    return apiKeys.map((apiKey) => ({
      id: apiKey.id,
      name: apiKey.name,
      apiKey: apiKey.apiKey,
      disabled: apiKey.disabled,
      creditsConsumed: apiKey.creditsConsumed,
      lastUsed: apiKey.lastUsed,
    }));
  }

  static async updateApiKey(id: string, userId: string, disabled: boolean) {
    await prisma.apiKey.update({
      where: {
        id,
        userId,
      },
      data: {
        disabled,
      },
    });
  }

  static async enableApiKey(id: string, userId: string) {
    await prisma.apiKey.update({
      where: {
        id,
        userId,
      },
      data: {
        disabled: false,
      },
    });
  }

  static async delete(userId: string, id: string) {
    await prisma.apiKey.update({
      where: {
        userId,
        id,
      },
      data: {
        deleted: true,
      },
    });
  }
}
