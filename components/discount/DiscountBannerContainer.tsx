import DiscountBanner from "./DiscountBanner";

export default function DiscountBannerContainer() {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <h1 className="text-mobile-title-3 sm:text-title-3">
        Discover CartMart Deals
      </h1>
      <div className="flex gap-4 sm:flex-row flex-col flex-wrap justify-center w-full">
        <DiscountBanner imageUrl="/images/discount-banners/fashion-banner.png" />
        <DiscountBanner imageUrl="/images/discount-banners/electronic-banner.png" />
        <div className="hidden md:flex gap-4">
          <DiscountBanner imageUrl="/images/discount-banners/hobby-banner.png" />
          <DiscountBanner imageUrl="/images/discount-banners/sport-banner.png" />
        </div>
      </div>
    </div>
  );
}
