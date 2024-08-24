import { NextHandler } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import { ProtectedRequestContext } from "../routers/protected-router";
import { BaseError } from "../errors/base-error";
import { PublicRequestContext } from "../routers/public-router";

export function globalErrorMiddleware(
  _req: NextRequest,
  _ctx: ProtectedRequestContext | PublicRequestContext,
  next: NextHandler
) {
  return next().catch((err: any) => {
    if (err instanceof BaseError) {
      return new NextResponse(
        JSON.stringify({
          statusCode: err.statusCode,
          baseError: true,
          message: err.message,
        }),
        {
          status: err.statusCode,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          statusCode: 500,
          baseError: false,
          message: "Internal Server Error",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  });
}
