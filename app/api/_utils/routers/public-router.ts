import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { globalErrorMiddleware } from "../middlewares/global-error";
import { parseRequestJsonMiddleware } from "../middlewares/parse-req-json";

export type PublicRequestContext<
  TPayload = unknown,
  TParams = unknown,
  TSearchParams = unknown
> = {
  payload: TPayload;
  params: TParams;
  searchParams: TSearchParams;
};

export function createPublicRouter<
  TPayload = unknown,
  TParams = unknown,
  TSearchParams = unknown
>() {
  return createEdgeRouter<
    NextRequest,
    PublicRequestContext<TPayload, TParams, TSearchParams>
  >()
    .use(globalErrorMiddleware)
    .use(parseRequestJsonMiddleware);
}
