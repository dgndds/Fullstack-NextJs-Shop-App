import { z } from "zod";

export const productIdParamsSchema = z.object({
  productId: z
    .string({
      required_error: "Product id is required",
    })
    .uuid({
      message: "Product id must be a valid uuid",
    }),
});

export type ProductIdParamsType = z.infer<typeof productIdParamsSchema>;
