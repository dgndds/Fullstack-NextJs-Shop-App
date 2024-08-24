import { NextRequest, NextResponse } from "next/server";

import { db } from "@/server/drizzle-client/drizzle-client";

import * as schema from "@/server/schema";
import {
  PublicRequestContext,
  createPublicRouter,
} from "../../_utils/routers/public-router";
import { ProtectedRequestContext } from "../../_utils/routers/protected-router";

import { sql } from "drizzle-orm";

export type RecommendedProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: string;
};

export type RecommendedProductResponseType = {
  status: number;
  data: RecommendedProductType[];
};

async function getRecommendedProductsHandler(
  _req: NextRequest,
  _ctx: PublicRequestContext
) {
  const sqlQuery = sql`
    SELECT *
    FROM ${schema.products}
    ORDER BY random()
    LIMIT 10;
  `;

  const res = await db.execute(sqlQuery);

  return NextResponse.json({
    status: 200,
    data: res,
  });
}

const router = createPublicRouter().get(getRecommendedProductsHandler);

export function GET(
  req: NextRequest,
  ctx: ProtectedRequestContext
): Promise<NextResponse<RecommendedProductResponseType>> {
  return router.run(req, ctx) as Promise<
    NextResponse<RecommendedProductResponseType>
  >;
}
