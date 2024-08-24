import { RecommendedProductType } from "@/app/api/product/recommended/route";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type RecommendedProductProps = {
  product: RecommendedProductType;
};

export default function RecommendedProduct({
  product,
}: RecommendedProductProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="w-[230px] h-[300px]">
        <CardContent className="relative w-full h-1/2 ">
          <Image
            src={`/images/default-product-image-${
              Math.floor(Math.random() * 5) + 1
            }.png`}
            alt="Product Image"
            quality={100}
            layout="fill"
            objectFit="cover"
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-between py-4 items-start h-1/2">
          <p className="text-md font-semibold line-clamp-2">{product.name}</p>
          <div>
            <p className="font-medium">
              <span className="font-bold text-primary">{product.rating}</span>{" "}
              stars
            </p>
            <p className="font-bold">{product.price} $</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
