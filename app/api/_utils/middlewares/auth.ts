import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../supabase/server";
import { NextHandler } from "next-connect";
import { UnauthorizedError } from "../errors/unauth-error";
import { ProtectedRequestContext } from "../routers/protected-router";
import { PublicRequestContext } from "../routers/public-router";

export async function authMiddleware(
  _req: NextRequest,
  ctx: ProtectedRequestContext,
  next: NextHandler
) {
  const supabase = createServerClient();

  const session = await supabase.auth.getUser();

  if (session.error) {
    throw new UnauthorizedError();
  }

  if (!session.data || !session.data) {
    throw new UnauthorizedError();
  }

  ctx.session = session.data.user;

  return await next();
}
