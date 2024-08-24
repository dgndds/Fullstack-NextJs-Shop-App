import { NextRequest, NextResponse } from "next/server";
import {
  ProtectedRequestContext,
  createProtectedRouter,
} from "../_utils/routers/protected-router";
import { db } from "@/server/drizzle-client/drizzle-client";
import {
  CreateProductRequestType,
  createProductSchema,
} from "./_schemas/requests.schema";
import * as schema from "@/server/schema";
import { parseRequestBodyMiddleware } from "../_utils/middlewares/request-body";
import {
  PublicRequestContext,
  createPublicRouter,
} from "../_utils/routers/public-router";

export type Product = {
  id: string;
  name: string | null;
  price: number | null;
  description: string | null;
  rating: number | null;
};

export type AllProductsResponseType = {
  status: number;
  data: Product[];
};

export type CreateProductResponseType = {
  status: number;
  data: {
    id: string;
  };
};

async function getAllProductsHandler(
  _req: NextRequest,
  _ctx: PublicRequestContext
) {
  const data = await db.query.products.findMany();

  return NextResponse.json({
    status: 200,
    data: data,
  });
}

const createProductHandler = async (
  req: NextRequest,
  ctx: ProtectedRequestContext<CreateProductRequestType>
) => {
  const product = await db
    .insert(schema.products)
    .values({
      name: ctx.payload.name,
      price: ctx.payload.price,
      description: ctx.payload.description,
      rating: ctx.payload.rating,
      user_id: ctx.session.id,
    })
    .returning({
      id: schema.products.id,
    });

  return NextResponse.json({
    status: 201,
    data: product[0],
  });
};

const router = createPublicRouter().get(getAllProductsHandler);

const createProductRouter = createProtectedRouter<
  CreateProductRequestType,
  unknown
>()
  .use(parseRequestBodyMiddleware(createProductSchema))
  .post(createProductHandler);

export function GET(
  req: NextRequest,
  ctx: ProtectedRequestContext
): Promise<NextResponse<AllProductsResponseType>> {
  return router.run(req, ctx) as Promise<NextResponse<AllProductsResponseType>>;
}

export function POST(
  req: NextRequest,
  ctx: ProtectedRequestContext<CreateProductRequestType>
): Promise<NextResponse<CreateProductResponseType>> {
  return createProductRouter.run(req, ctx) as Promise<
    NextResponse<CreateProductResponseType>
  >;
}
