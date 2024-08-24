import { NextRequest } from "next/server";
import { PublicRequestContext } from "../routers/public-router";
import { ProtectedRequestContext } from "../routers/protected-router";
import { NextHandler } from "next-connect";

export async function parseRequestSearchParams(
  req: NextRequest,
  ctx: ProtectedRequestContext | PublicRequestContext,
  next: NextHandler
) {
  //if there is no search params, return next
  if (!req.nextUrl.searchParams) {
    return next();
  }

  ctx.searchParams = Object.fromEntries(req.nextUrl.searchParams);

  return next();
}
