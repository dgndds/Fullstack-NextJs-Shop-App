import Image from "next/image";

const CartMartLogo = () => (
  <Image
    src={"/logo/cart-mart-logo.png"}
    className="shrink-0"
    priority={true}
    width={50}
    height={28}
    alt="CartMart Logo"
    quality={100}
  />
);

export default CartMartLogo;
