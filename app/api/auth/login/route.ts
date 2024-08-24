import { createServerClient } from "@/app/api/_utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import {
  PublicRequestContext,
  createPublicRouter,
} from "../../_utils/routers/public-router";
import { parseRequestBodyMiddleware } from "../../_utils/middlewares/request-body";
import { LoginRequestType, loginSchema } from "../_schemas/login-schema";
import { Session, User } from "@supabase/supabase-js";
import { BadRequestError } from "../../_utils/errors/bad-request-error";

export type LoginResponseType = {
  status: number;
  message: string;
  session: Session;
  user: User;
};

async function loginHandler(
  _req: NextRequest,
  ctx: PublicRequestContext<LoginRequestType>
) {
  const { email, password } = ctx.payload;
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new BadRequestError(error.message);
  }

  await supabase.auth.setSession(data.session);

  return NextResponse.json({
    status: 200,
    message: "Logged in successfully",
    session: data.session,
    user: data.user,
  });
}

const router = createPublicRouter<LoginRequestType>()
  .use(parseRequestBodyMiddleware(loginSchema))
  .post(loginHandler);

export function POST(
  req: NextRequest,
  ctx: PublicRequestContext<LoginRequestType>
): Promise<NextResponse<LoginResponseType>> {
  return router.run(req, ctx) as Promise<NextResponse<LoginResponseType>>;
}
