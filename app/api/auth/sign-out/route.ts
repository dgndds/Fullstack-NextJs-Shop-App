import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../_utils/supabase/server";

import {
  PublicRequestContext,
  createPublicRouter,
} from "../../_utils/routers/public-router";
import { BadRequestError } from "../../_utils/errors/bad-request-error";

export type SignOutResponseType = {
  status: number;
  message: string;
};

async function signOutHandler(_req: NextRequest, _ctx: PublicRequestContext) {
  const supabase = createServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new BadRequestError(error.message);
  }

  return NextResponse.json({ status: 200, message: "Logged out successfully" });
}

const router = createPublicRouter().post(signOutHandler);

export function POST(
  req: NextRequest,
  ctx: PublicRequestContext
): Promise<NextResponse<SignOutResponseType>> {
  return router.run(req, ctx) as Promise<NextResponse<SignOutResponseType>>;
}
