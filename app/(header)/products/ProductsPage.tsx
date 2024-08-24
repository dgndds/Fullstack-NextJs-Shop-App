import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductContainer from "./ProductContainer";
import ProductsPageSkeleton from "../../../components/skeleton/ProductsPageSkeleton";
import FiltersColumn from "./FiltersColumn";
import { useSearchParams } from "next/navigation";
import { Product } from "@/app/api/product/route";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getSearchResults } from "@/app/utils/product/api-calls";
import { useEffect } from "react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn:
      searchParams.get("query") !== null && searchParams.get("query") !== ""
        ? () => getSearchResults(searchParams.get("query") as string)
        : getProducts,
  });

  useEffect(() => {
    //invalidate query cache when search query changes
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  }, [searchParams.get("query")]);

  return (
    <div className="w-full container flex flex-row gap-4 mt-4">
      <FiltersColumn />
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-start flex-col gap-2">
          <h2 className="text-mobile-title-1 sm:text-title-1">Products</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Main Page</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-col gap-4 mr-auto">
          {isFetching && <ProductsPageSkeleton />}

          {isLoading && <ProductsPageSkeleton />}

          {!isLoading && data && data.length === 0 && (
            <p>No Products are available</p>
          )}

          {!isLoading && !error && data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto sm:m-0">
              {data.map((product, index) => (
                <ProductContainer
                  key={product.name ?? "product" + index}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
