import { NextRequest } from "next/server";
import { PublicRequestContext } from "../routers/public-router";
import { ProtectedRequestContext } from "../routers/protected-router";
import { NextHandler } from "next-connect";

export async function parseRequestJsonMiddleware(
  req: NextRequest,
  ctx: ProtectedRequestContext | PublicRequestContext,
  next: NextHandler
) {
  let payload = {};

  const clonedRequest = req.clone();

  // parse the request body to json
  try {
    payload = await clonedRequest.json();
  } catch (e) {}

  ctx.payload = payload;

  return next();
}
