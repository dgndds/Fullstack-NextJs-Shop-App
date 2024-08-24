"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchFormData, searchSchema } from "@/utils/types/search";

export default function ModSearchBar() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    if (data.query === "") router.push(`/moderator/products`);
    else
      router.push(
        `/moderator/products?query=${encodeURIComponent(data.query)}`
      );
  };

  return (
    <form
      className="flex w-full sm:max-w-sm items-center space-x-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="search"
        placeholder="Search for products"
        {...register("query")}
      />
      <Button type="submit" className=" hover:bg-primary-dark">
        Search
      </Button>
    </form>
  );
}
