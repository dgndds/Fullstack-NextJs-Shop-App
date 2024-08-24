import { db } from "@/server/drizzle-client/drizzle-client";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import * as schema from "@/server/schema";
import {
  ProtectedRequestContext,
  createProtectedRouter,
} from "../../_utils/routers/protected-router";
import { NotFoundError } from "../../_utils/errors/not-found-error";
import {
  ProductIdParamsType,
  productIdParamsSchema,
} from "../_schemas/params.schema";
import { parseRequestParamsMiddleware } from "../../_utils/middlewares/request-params";
import {
  PublicRequestContext,
  createPublicRouter,
} from "../../_utils/routers/public-router";
import { Product } from "../route";
import {
  UpdateProductType,
  updateProductSchema,
} from "../_schemas/requests.schema";
import { parseRequestBodyMiddleware } from "../../_utils/middlewares/request-body";

export type ProductResponseType = {
  status: number;
  data: Product;
};

export type DeleteProductResponseType = {
  status: number;
  message: string;
};

async function getProductByIdHandler(
  _req: NextRequest,
  ctx: PublicRequestContext<unknown, ProductIdParamsType>
) {
  const products = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.id, ctx.params.productId))
    .limit(1);

  if (products.length === 0) {
    throw new NotFoundError(`Product with id ${ctx.params.productId}`);
  }

  return NextResponse.json({
    status: 200,
    data: products[0],
  });
}

async function deleteProductByIdHandler(
  _req: NextRequest,
  ctx: ProtectedRequestContext<unknown, ProductIdParamsType>
) {
  const product = await db.query.products.findFirst({
    where: eq(schema.products.id, ctx.params.productId),
  });

  if (!product) {
    throw new NotFoundError(`Product with id ${ctx.params.productId}`);
  }

  await db
    .delete(schema.products)
    .where(eq(schema.products.id, ctx.params.productId));

  return NextResponse.json({
    status: 200,
    message: `Product with id ${ctx.params.productId} has been deleted`,
  });
}

async function updateProductByIdHandler(
  req: NextRequest,
  ctx: ProtectedRequestContext<UpdateProductType, ProductIdParamsType>
) {
  const updatedProduct = await db
    .update(schema.products)
    .set(ctx.payload)
    .where(eq(schema.products.id, ctx.params.productId))
    .returning({
      id: schema.products.id,
    });

  return NextResponse.json({
    status: 200,
    data: updatedProduct[0],
  });
}

const router = createPublicRouter<unknown, ProductIdParamsType>()
  .use(parseRequestParamsMiddleware(productIdParamsSchema))
  .get(getProductByIdHandler);

const protectedDeleteRouter = createProtectedRouter<
  unknown,
  ProductIdParamsType
>()
  .use(parseRequestParamsMiddleware(productIdParamsSchema))
  .delete(deleteProductByIdHandler);

const protectedUpdateRouter = createProtectedRouter<
  UpdateProductType,
  ProductIdParamsType
>()
  .use(parseRequestParamsMiddleware(productIdParamsSchema))
  .use(parseRequestBodyMiddleware(updateProductSchema))
  .put(updateProductByIdHandler);

export function GET(
  req: NextRequest,
  ctx: ProtectedRequestContext<unknown, { productId: string }>
): Promise<NextResponse<ProductResponseType>> {
  return router.run(req, ctx) as Promise<NextResponse<ProductResponseType>>;
}

export function DELETE(
  req: NextRequest,
  ctx: ProtectedRequestContext<unknown, { productId: string }>
): Promise<NextResponse<DeleteProductResponseType>> {
  return protectedDeleteRouter.run(req, ctx) as Promise<
    NextResponse<DeleteProductResponseType>
  >;
}

export function PUT(
  req: NextRequest,
  ctx: ProtectedRequestContext<UpdateProductType, { productId: string }>
): Promise<NextResponse<ProductResponseType>> {
  return protectedUpdateRouter.run(req, ctx) as Promise<
    NextResponse<ProductResponseType>
  >;
}
