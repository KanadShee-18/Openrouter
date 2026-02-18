import { t } from "elysia";

export namespace AuthModel {
  export const signInSchema = t.Object({
    email: t.String(),
    password: t.String(),
  });

  export type signInSchema = typeof signInSchema.static;

  export const signInResponseSchema = t.Object({
    message: t.Literal("Signed Up Successfully!"),
  });

  export type signInResponseSchema = typeof signInResponseSchema.static;

  export const signUpSchema = t.Object({
    name: t.String(),
    email: t.String(),
    password: t.String(),
  });

  export type signUpSchema = typeof signUpSchema.static;

  export const signUpResponseSchema = t.Object({
    id: t.String(),
    message: t.String(),
  });

  export type signUpResponseSchema = typeof signUpResponseSchema.static;

  export const signUpFailedSchema = t.Object({
    message: t.String(),
  });
  export const signInFailedSchema = t.Object({
    message: t.String(),
  });
  export const userExistenceSchema = t.Object({
    message: t.Literal("User already exists!"),
  });
  export type userExistenceSchema = typeof userExistenceSchema.static;
  export type signUpFailedSchema = typeof signUpFailedSchema.static;
  export type signInFailedSchema = typeof signInFailedSchema.static;
}
