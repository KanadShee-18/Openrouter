import { t } from "elysia";

export namespace PaymentModel {
  export const onRampResponseSchema = t.Object({
    message: t.Literal("Onramp Successful"),
    credits: t.Number(),
  });

  export type onRampResponseSchema = typeof onRampResponseSchema.static;

  export const onRampFailedSchema = t.Object({
    message: t.Literal("Onramp Failed!"),
  });

  export type onRampFailedSchema = typeof onRampFailedSchema.static;
}
