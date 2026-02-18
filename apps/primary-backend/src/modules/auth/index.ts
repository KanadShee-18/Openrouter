import { Cookie, Elysia } from "elysia";
import { AuthModel } from "./model";
import { AuthService } from "./service";
import jwt from "@elysiajs/jwt";

export const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET as string,
      exp: "7d",
    }),
  )
  .post(
    "/sign-up",
    async ({ body, status }) => {
      try {
        const { id, message } = await AuthService.signUp(
          body.name,
          body.email,
          body.password,
        );
        return {
          id,
          message: message,
        };
      } catch (error) {
        console.log("Error: ", error);
        return status(400, {
          message: "Some error occurred while sign up!",
        } satisfies AuthModel.signUpFailedSchema);
      }
    },
    {
      body: AuthModel.signUpSchema,
      response: {
        200: AuthModel.signUpResponseSchema,
        400: AuthModel.signUpFailedSchema,
      },
    },
  )
  .post(
    "/sign-in",
    async ({ jwt, body, status, cookie: { auth } }) => {
      const { correctCredentials, userId } = await AuthService.signIn(
        body.email,
        body.password,
      );

      if (correctCredentials && userId) {
        const token = await jwt.sign({ userId });

        if (!auth) {
          auth = new Cookie("auth", {});
        }

        auth.set({
          value: token,
          httpOnly: true,
          maxAge: 7 * 86400,
        });

        return {
          message: "Signed Up Successfully!",
        };
      } else {
        return status(403, {
          message: "Incorrect Credentials",
        });
      }
    },
    {
      body: AuthModel.signInSchema,
      response: {
        200: AuthModel.signInResponseSchema,
        403: AuthModel.signInFailedSchema,
      },
    },
  );
