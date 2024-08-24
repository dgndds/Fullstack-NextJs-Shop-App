import Image from "next/image";

const HeroBanner = () => (
  <div className="w-screen relative max-w-[1530px] hidden md:block">
    <Image
      priority
      src="/images/hero-banner.png"
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-auto -z-10 relative"
      alt="hero image"
    />
  </div>
);

export default HeroBanner;
