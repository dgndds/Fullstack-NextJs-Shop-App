import { Product } from "@/app/api/product/route";
import { toast } from "react-toastify";

export const getProducts = async () => {
  try {
    const response = await fetch("/api/product/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());

    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch products");
  }
};

export const getProductById = async (productId: string) => {
  try {
    const response = await fetch("/api/product/" + productId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());

    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch product details");
  }
};

export const getSearchResults = async (query: string) => {
  try {
    const response = await fetch(`/api/product/search?query=${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());

    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch products");
  }
};

export const rateProduct = async (rating: number, productId: string) => {
  try {
    const response = await fetch(`/api/product/${productId}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    }).then((response) => response.json());

    return response.data;
  } catch (error: any) {
    toast.error("Failed to rate the product");
  }
};

export const updateProduct = async (
  updatedProduct: Omit<Product, "id">,
  productId: string
) => {
  const response = await fetch(`/api/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
};

export const createProduct = async (newProduct: Omit<Product, "id">) => {
  const response = await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  return response.json();
};

export const deleteProduct = async (productId: string) => {
  const response = await fetch(`/api/product/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
};

export const fetchRecommendedProductsData = async () => {
  const response = await fetch("/api/product/recommended").then((res) =>
    res.json()
  );

  return response.data;
};
