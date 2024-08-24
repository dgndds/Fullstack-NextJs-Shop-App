import { db } from "@/server/drizzle-client/drizzle-client";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import * as schema from "@/server/schema";
import {
  PublicRequestContext,
  createPublicRouter,
} from "@/app/api/_utils/routers/public-router";
import {
  RateProductType,
  rateProductSchema,
} from "../../_schemas/requests.schema";
import {
  ProductIdParamsType,
  productIdParamsSchema,
} from "../../_schemas/params.schema";
import { NotFoundError } from "@/app/api/_utils/errors/not-found-error";
import { parseRequestParamsMiddleware } from "@/app/api/_utils/middlewares/request-params";
import { parseRequestBodyMiddleware } from "@/app/api/_utils/middlewares/request-body";

export type RateProductResponseType = {
  status: number;
  data: {
    id: string;
    rating: number;
    totalRatings: number;
  };
};

async function rateProductHandler(
  _req: NextRequest,
  ctx: PublicRequestContext<RateProductType, ProductIdParamsType>
) {
  const productId = ctx.params.productId;
  const rating = ctx.payload.rating;

  const products = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, productId))
    .limit(1);

  if (products.length === 0) {
    throw new NotFoundError(`Product with id ${productId}`);
  }

  const product = products[0];
  const currentRating = product.rating || 0;
  const totalRatings = product.total_ratings || 0;

  const newTotalRatings = totalRatings + 1;
  const newRating = (currentRating * totalRatings + rating) / newTotalRatings;

  //make it multiple of .5
  const roundedRating = Math.round(newRating * 2) / 2;

  await db
    .update(schema.products)
    .set({
      rating: roundedRating,
      total_ratings: newTotalRatings,
    })
    .where(eq(schema.products.id, productId));

  return NextResponse.json({
    status: 200,
    message: `Product with id ${productId} has been rated`,
    data: { productId, rating: roundedRating, totalRatings: newTotalRatings },
  });
}

const rateRouter = createPublicRouter<RateProductType, ProductIdParamsType>()
  .use(parseRequestParamsMiddleware(productIdParamsSchema))
  .use(parseRequestBodyMiddleware(rateProductSchema))
  .post(rateProductHandler);

export function POST(
  req: NextRequest,
  ctx: PublicRequestContext<RateProductType, ProductIdParamsType>
): Promise<NextResponse<RateProductResponseType>> {
  return rateRouter.run(req, ctx) as Promise<
    NextResponse<RateProductResponseType>
  >;
}
