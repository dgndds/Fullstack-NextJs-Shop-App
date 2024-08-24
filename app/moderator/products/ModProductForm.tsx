import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/app/api/product/route";
import { toast } from "react-toastify";
import {
  UpdateProductType,
  updateProductSchema,
} from "@/app/api/product/_schemas/requests.schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/app/utils/product/api-calls";

type ModProductFormProps = {
  product: Product | null;
  onClose: () => void;
  onSave?: (newProduct: Omit<Product, "id">) => void;
};

export default function ModProductForm({
  product,
  onClose,
  onSave,
}: ModProductFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProductType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product?.name ?? undefined,
      description: product?.description ?? undefined,
      price: product?.price ?? undefined,
      rating: product?.rating ?? undefined,
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct: Omit<Product, "id">) =>
      updateProduct(updatedProduct, product?.id ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mod-products"] });
      toast.success("Product updated successfully!");
      onClose();
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  const onSubmit = (data: UpdateProductType) => {
    const newProduct = {
      name: data.name ?? null,
      description: data.description ?? null,
      price: data.price ?? null,
      rating: data.rating ?? null,
    };

    if (onSave) {
      onSave(newProduct);
    } else if (product) {
      updateProductMutation.mutate(newProduct);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Create Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label className="block text-sm font-bold mb-2">Name</Label>
            <Input type="text" className="mb-2" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label className="block text-sm font-bold mb-2">Description</Label>
            <Textarea className="mb-2 w-full" {...register("description")} />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label className="block text-sm font-bold mb-2">Price</Label>
            <Input
              type="number"
              step={0.01}
              className="mb-2"
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label className="block text-sm font-bold mb-2">Rating</Label>
            <Input
              type="text"
              className="mb-2"
              {...register("rating", {
                valueAsNumber: true,
              })}
            />
            {errors.rating && (
              <p className="text-red-500">{errors.rating.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="hover:bg-primary-dark">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
