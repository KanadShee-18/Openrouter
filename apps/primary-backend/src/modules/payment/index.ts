import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { PaymentService } from "./service";
import { PaymentModel } from "./model";

export const payment = new Elysia({ prefix: "/payments" })
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
      return status(401);
    }

    return {
      userId: decoded.userId,
    };
  })
  .post(
    "/onramp",
    async ({ status, userId }) => {
      try {
        const credits = await PaymentService.onRamp(String(userId));
        return {
          message: "Onramp Successful" as const,
          credits,
        };
      } catch (error) {
        return status(411, {
          message: "Onramp Failed!" as const,
        });
      }
    },
    {
      response: {
        200: PaymentModel.onRampResponseSchema,
        411: PaymentModel.onRampFailedSchema,
      },
    },
  );
