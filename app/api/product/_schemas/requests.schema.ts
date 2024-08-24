import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: "Product title is required",
    })
    .trim()
    .min(1, { message: "Product name must be at least 1 characters long" }),
  description: z.string({
    required_error: "Product description is required",
  }),
  price: z
    .number({
      required_error: "Product price is required",
    })
    .nonnegative({ message: "Price must be a positive number" })
    .multipleOf(0.01, { message: "Price must be two decimals" }),
  rating: z
    .number({
      required_error: "Product rating is required",
      invalid_type_error: "Product rating is required",
    })
    .multipleOf(0.5, { message: "Rating must be a multiple of 0.5" })
    .min(0)
    .max(5),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long" })
    .optional(),
  description: z
    .string()
    .min(3, {
      message: "Product description must be at least 3 characters long",
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
      required_error: "Price is required",
    })
    .multipleOf(0.01, { message: "Price must be two decimals" })
    .positive({ message: "Price must be a positive number" })
    .optional(),
  rating: z
    .number({
      invalid_type_error: "Rating must be a valid decimal number",
      required_error: "Rating is required",
    })
    .min(0, { message: "Rating must be at least 0" })
    .max(5, { message: "Rating must be at most 5" })
    .multipleOf(0.5, { message: "Rating must be a multiple of 0.5" })
    .optional(),
});

export const searchProductsQuerySchema = z.object({
  query: z
    .string({
      required_error: "Query is required",
    })
    .min(1, {
      message: "Query must be at least 1 character long",
    }),
});

export const rateProductSchema = z.object({
  rating: z.number().multipleOf(0.5).min(1).max(5),
});

export type UpdateProductType = z.infer<typeof updateProductSchema>;

export type CreateProductRequestType = z.infer<typeof createProductSchema>;

export type SearchProductsQueryType = z.infer<typeof searchProductsQuerySchema>;

export type RateProductType = z.infer<typeof rateProductSchema>;
