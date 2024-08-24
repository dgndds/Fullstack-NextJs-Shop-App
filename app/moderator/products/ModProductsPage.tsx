"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ModProduct from "./ModProduct";
import ModProductSkeleton from "../../../components/skeleton/ModProductSkeleton";
import ModProductForm from "./ModProductForm";
import { Product } from "@/app/api/product/route";
import { useSearchParams } from "next/navigation";
import ModSearchBar from "./ModSearchBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSearchResults,
} from "@/app/utils/product/api-calls";

export default function ModProductsPage() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["mod-products"],
    queryFn:
      searchParams.get("query") !== null && searchParams.get("query") !== ""
        ? () => getSearchResults(searchParams.get("query") as string)
        : getProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] =
    useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(selectedDeleteProduct?.id ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mod-products"] });
      toast.success("Product deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  const createProductMutation = useMutation({
    mutationFn: (newProduct: Omit<Product, "id">) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mod-products"] });
      toast.success("Product created successfully!");
      setIsCreating(false);
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  const handleCreateProduct = (newProduct: Omit<Product, "id">) => {
    createProductMutation.mutate(newProduct);
  };

  useEffect(() => {
    //invalidate query cache when search query changes
    queryClient.invalidateQueries({
      queryKey: ["mod-products"],
    });
  }, [searchParams.get("query")]);

  if (error) {
    toast.error(`Failed to fetch products`);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-mobile-title-1 sm:text-title-1 text-center">
          Manage Products
        </h1>
        <Link
          href="/"
          className="underline cursor-pointer flex items-center gap-2 text-sm"
        >
          Go To Main Page
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
        <Button
          className="hover:bg-primary-dark"
          onClick={() => setIsCreating(true)}
        >
          Create New Product
        </Button>
        <ModSearchBar />
      </div>

      {(isLoading || error) && <ModProductSkeleton />}
      {isFetching && <ModProductSkeleton />}

      {!isLoading && !error && !isFetching && data && data.length === 0 && (
        <div className="text-center text-lg font-semibold">
          No products found
        </div>
      )}

      {!isLoading && !error && !isFetching && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: Product) => (
            <ModProduct
              key={product.id}
              product={product}
              onSelect={() => setSelectedProduct(product)}
              onDeleteSelect={() => setSelectedDeleteProduct(product)}
              onDelete={() => {
                deleteProductMutation.mutate();
              }}
            />
          ))}
        </div>
      )}
      {(selectedProduct || isCreating) && (
        <ModProductForm
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            setIsCreating(false);
          }}
          onSave={isCreating ? handleCreateProduct : undefined}
        />
      )}
    </div>
  );
}
