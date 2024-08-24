import { NextRequest } from "next/server";
import { z } from "zod";
import { PublicRequestContext } from "../routers/public-router";
import { ProtectedRequestContext } from "../routers/protected-router";
import { NextHandler } from "next-connect";
import { BadRequestError } from "../errors/bad-request-error";

export const parseRequestParamsMiddleware =
  <T>(schema: z.ZodSchema<T>) =>
  async (
    _req: NextRequest,
    ctx: PublicRequestContext | ProtectedRequestContext,
    next: NextHandler
  ) => {
    try {
      schema.parse(ctx.params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues
          .map((issue) => issue.message)
          .join(", ");

        throw new BadRequestError(errorMessage);
      } else {
        throw new BadRequestError();
      }
    }

    return next();
  };
