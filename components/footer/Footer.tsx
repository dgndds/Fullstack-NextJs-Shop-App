import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-primary-foreground border border-border w-full">
      <div className="flex">
        <span className="bg-primary-light h-2 w-1/3"></span>
        <span className="bg-primary h-2 w-1/3"></span>
        <span className="bg-primary-dark h-2 w-1/3"></span>
      </div>

      <div className="p-3 max-w-xl mx-auto">
        <div className="flex justify-between pb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-primary text-body font-bold">CartMart</h1>

            <div className="flex flex-col gap-2 underline cursor-pointer">
              <span>About Us</span>
              <span>Contact Us</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Refund Policy</span>
              <span>Career</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-primary text-body font-bold">Info</h1>

            <div className="flex flex-col gap-2 underline cursor-pointer">
              <span>Shipping Information</span>
              <span>Returns & Exchanges</span>
              <span>FAQs</span>
              <span>Order Tracking</span>
              <span>Gift Cards</span>
              <span>Store Locator</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-primary text-body font-bold">Navigation</h1>

            <div className="flex flex-col gap-2 underline cursor-pointer">
              <span>Home</span>
              <span>Shop</span>
              <span>Offers</span>
              <span>Blog</span>
              <span>Support</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-primary text-body font-bold">Follow Us</h1>

          <div className="flex gap-2 underline cursor-pointer justify-between w-full">
            <IconBrandFacebook size={24} />
            <IconBrandInstagram size={24} />
            <IconBrandYoutube size={24} />
            <IconBrandTwitter size={24} />
            <IconBrandTiktok size={24} />
            <IconBrandLinkedin size={24} />
          </div>
        </div>
      </div>
    </footer>
  );
}
