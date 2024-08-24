import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type DiscountBannerProps = {
  imageUrl: string;
};

export default function DiscountBanner({ imageUrl }: DiscountBannerProps) {
  return (
    <Card className="sm:w-[227px] sm:h-[400px] w-full h-[227px]">
      <CardContent className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt="Discount Banner"
          quality={100}
          layout="fill"
          objectFit="cover"
        />
      </CardContent>
    </Card>
  );
}
