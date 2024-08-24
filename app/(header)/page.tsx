import HeroBanner from "@/components/HeroBanner";
import Discounts from "@/components/discount/Discounts";
import RecommendedProducts from "@/components/product/recommended/RecommendedProducts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 md:px-10 px-6">
      <HeroBanner />

      <Discounts />

      <RecommendedProducts />
    </main>
  );
}
