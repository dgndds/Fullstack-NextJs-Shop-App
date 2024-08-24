import { NextRequest, NextResponse } from "next/server";
import {
  PublicRequestContext,
  createPublicRouter,
} from "../../_utils/routers/public-router";
import {
  Session,
  User,
  UserMetadata,
  createClient,
} from "@supabase/supabase-js";
import { createServerClient } from "../../_utils/supabase/server";
import { UserRole } from "@/utils/types/user-role-enum";
import { SignUpRequestType, signUpSchema } from "../_schemas/sign-up-schema";
import { InternalServerError } from "../../_utils/errors/internal-error";
import { BadRequestError } from "../../_utils/errors/bad-request-error";
import { db } from "@/server/drizzle-client/drizzle-client";
import { users } from "@/server/schema";
import { parseRequestBodyMiddleware } from "../../_utils/middlewares/request-body";

export type SignUpResponseType = {
  status: number;
  message: string;
  session: Session;
  user: User;
};

async function signUpHandler(
  _req: NextRequest,
  ctx: PublicRequestContext<SignUpRequestType>
) {
  const { email, password } = ctx.payload;

  const supabase = createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        roles: [UserRole.USER],
      } satisfies UserMetadata,
    },
  });

  if (error) {
    throw new BadRequestError(error.message);
  }

  if (!data.user) {
    throw new InternalServerError("Something went wrong while creating user.");
  }

  try {
    await db
      .insert(users)
      .values({
        id: data.user.id,
        role: UserRole.USER,
        created_at: new Date(),
      })
      .onConflictDoNothing();
  } catch (error) {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );

    await supabaseAdmin.auth.admin.deleteUser(data.user.id);

    throw error;
  }

  return NextResponse.json({
    status: 200,
    message: "User created successfully",
    session: data.session,
    user: data.user,
  });
}

const router = createPublicRouter<SignUpRequestType>()
  .use(parseRequestBodyMiddleware(signUpSchema))
  .post(signUpHandler);

export function POST(
  req: NextRequest,
  ctx: PublicRequestContext<SignUpRequestType>
): Promise<NextResponse<SignUpResponseType>> {
  return router.run(req, ctx) as Promise<NextResponse<SignUpResponseType>>;
}
