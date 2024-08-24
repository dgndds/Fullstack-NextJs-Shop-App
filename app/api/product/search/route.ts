import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/drizzle-client/drizzle-client";

import { ilike, and } from "drizzle-orm";
import * as schema from "@/server/schema";
import { Product } from "../route";
import {
  PublicRequestContext,
  createPublicRouter,
} from "../../_utils/routers/public-router";

import { parseRequestBodyMiddleware } from "../../_utils/middlewares/request-body";
import {
  SearchProductsQueryType,
  searchProductsQuerySchema,
} from "../_schemas/requests.schema";
import { parseRequestSearchParams } from "../../_utils/middlewares/parse-search-params";
import { parseRequestSearchParamsMiddleware } from "../../_utils/middlewares/request-search-params";

export type SearchProductsResponseType = {
  status: number;
  data: Product[];
};

async function searchProductsHandler(
  req: NextRequest,
  ctx: PublicRequestContext<unknown, unknown, SearchProductsQueryType>
) {
  const data = await db.query.products.findMany({
    where: and(ilike(schema.products.name, `%${ctx.searchParams.query}%`)),
  });

  return NextResponse.json({
    status: 200,
    data: data,
  });
}

const router = createPublicRouter<unknown, unknown, SearchProductsQueryType>()
  .use(parseRequestSearchParams)
  .use(parseRequestSearchParamsMiddleware(searchProductsQuerySchema))
  .get(searchProductsHandler);

export function GET(
  req: NextRequest,
  ctx: PublicRequestContext<unknown, unknown, SearchProductsQueryType>
): Promise<NextResponse<SearchProductsResponseType>> {
  return router.run(req, ctx) as Promise<
    NextResponse<SearchProductsResponseType>
  >;
}
