import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { authMiddleware } from "../middlewares/auth";
import { User } from "@supabase/supabase-js";
import { globalErrorMiddleware } from "../middlewares/global-error";
import { parseRequestJsonMiddleware } from "../middlewares/parse-req-json";

export type ProtectedRequestContext<
  TPayload = unknown,
  TParams = unknown,
  TSearchParams = unknown
> = {
  payload: TPayload;
  params: TParams;
  searchParams: TSearchParams;
  session: User;
};

export function createProtectedRouter<
  TPayload = unknown,
  TParams = unknown,
  TSearchParams = unknown
>() {
  const protectedRouter = createEdgeRouter<
    NextRequest,
    ProtectedRequestContext<TPayload, TParams, TSearchParams>
  >();

  protectedRouter
    .use(globalErrorMiddleware)
    .use(parseRequestJsonMiddleware)
    .use(authMiddleware);

  return protectedRouter;
}
