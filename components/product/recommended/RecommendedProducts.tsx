"use client";

import { RecommendedProductType } from "@/app/api/product/recommended/route";
import { useQuery } from "@tanstack/react-query";
import RecommendedProduct from "./RecommendedProduct";
import RecommendedProductSkeleton from "../../skeleton/RecommendedProductSkeleton";
import { toast } from "react-toastify";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { fetchRecommendedProductsData } from "@/app/utils/product/api-calls";

export default function RecommendedProducts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["recommended-products"],
    queryFn: fetchRecommendedProductsData,
  });

  if (error) {
    toast.error(`Failed to fetch the recommended products`);
  }

  return (
    <div className="flex gap-2 flex-col items-center">
      <h1 className="text-mobile-title-3 sm:text-title-3">
        Recommended Products For You
      </h1>
      {(isLoading || error) && <RecommendedProductSkeleton />}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data.map((product: RecommendedProductType) => (
              <RecommendedProduct key={product.id} product={product} />
            ))}
          </div>
          <Link
            href="/products"
            className="mt-2 underline cursor-pointer flex items-center gap-2"
          >
            View All Products <IconArrowRight className="w-4 h-4" />
          </Link>
        </>
      )}
    </div>
  );
}
