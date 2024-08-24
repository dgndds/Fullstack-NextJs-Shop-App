import { Product } from "@/app/api/product/route";
import Link from "next/link";
import Image from "next/image";

type ProductProps = {
  product: Product;
};

export default function ProductContainer({ product }: ProductProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="border border-border h-[450px] w-[250px] rounded flex flex-col cursor-pointer"
    >
      <div className="relative w-full h-[290px] flex items-center justify-center">
        <Image
          src={`/images/default-product-image-${
            Math.floor(Math.random() * 5) + 1
          }.png`}
          alt="Product Image"
          quality={100}
          layout="fill"
          objectFit="cover"
          className="w-full h-36"
        />
      </div>

      <div className="p-4 flex flex-col justify-between grow">
        <h2 className="font-semibold line-clamp-2 min-h-11">{product.name}</h2>

        <div>
          <p>
            <span className="font-bold text-primary">{product.rating}</span>{" "}
            rating
          </p>
          <p className="font-bold">{product.price} $</p>
        </div>
      </div>
    </Link>
  );
}
