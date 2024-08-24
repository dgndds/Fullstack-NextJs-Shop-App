"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/app/api/product/route";
import { Button } from "@/components/ui/button";
import { IconHeart, IconStar } from "@tabler/icons-react";
import Image from "next/image";
import ProductComments from "@/components/product/details/ProductComments";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  RateProductType,
  rateProductSchema,
} from "@/app/api/product/_schemas/requests.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";
import { getProductById, rateProduct } from "@/app/utils/product/api-calls";

type Props = {
  params: {
    productId: string;
  };
};

export default function ProductDetails({ params }: Props) {
  const queryClient = useQueryClient();

  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);

  const { data, error, isLoading } = useQuery<Product>({
    queryKey: ["product", params.productId],
    queryFn: () => getProductById(params.productId),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RateProductType>({
    resolver: zodResolver(rateProductSchema),
    defaultValues: {
      rating: data?.rating ?? undefined,
    },
  });

  const rateProductMutation = useMutation({
    mutationFn: (rating: number) => rateProduct(rating, params.productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", params.productId],
      });
      toast.success("Product rated successfully");
    },
    onError: () => {
      toast.error("Failed to rate the product");
    },
  });

  const onSubmit = (data: RateProductType) => {
    rateProductMutation.mutate(data.rating);
    setIsRateDialogOpen(false);
  };

  return (
    <div className="container">
      <div className="w-full items-center flex flex-col gap-4 p-5">
        {isLoading && <ProductDetailsSkeleton />}
        {!isLoading && !error && (
          <div className="w-full flex flex-col gap-16">
            <div className="flex flex-1 gap-8 flex-col md:flex-row">
              <div className="relative md:flex-1 w-full h-[435px]">
                <Image
                  src="/images/product-detail-image.png"
                  alt="Product Image"
                  quality={100}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="flex flex-col gap-6 flex-1 justify-between min-h-[435px]">
                <div className="flex flex-col gap-4">
                  <span className="text-mobile-title-2 sm:text-title-1 line-clamp-2 font-extrabold">
                    {data?.name}
                  </span>
                  <span className="text-title-3 font-normal">
                    {data?.price} $
                  </span>
                  <span className="text-xl font-semi-bold">
                    <span className="text-primary">{data?.rating} </span> rating
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <Button className="hover:bg-primary-dark">Buy Now</Button>
                  <Button variant="secondary" className="flex gap-2 w-full">
                    <IconHeart className="w-3 h-3 shrink-0" />
                    Favorite
                  </Button>

                  {/* rate dialog */}
                  <Dialog
                    open={isRateDialogOpen}
                    onOpenChange={setIsRateDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="flex gap-2 w-full">
                        <IconStar className="w-3 h-3 shrink-0" />
                        Rate
                      </Button>
                    </DialogTrigger>
                    {/* to prevent the warning in the console */}
                    <DialogHeader hidden>
                      <DialogTitle hidden />
                    </DialogHeader>
                    <DialogContent>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 mb-5">
                          <h1 className="text-title-3">Rate the product</h1>
                          <Input
                            type="number"
                            step={0.5}
                            defaultValue={data?.rating ?? 0}
                            {...register("rating", { valueAsNumber: true })}
                          />
                          {errors.rating && (
                            <p className="text-destructive">
                              {errors.rating.message}
                            </p>
                          )}
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="hover:bg-primary-dark"
                          >
                            Confirm
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* product description */}
            <div className="flex flex-col gap-4">
              <h1 className="text-title-3">About Product</h1>
              <p>{data?.description}</p>
            </div>

            {/* comments */}
            <ProductComments />
          </div>
        )}
      </div>
    </div>
  );
}
