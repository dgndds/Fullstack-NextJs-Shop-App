import Link from "next/link";
import CartMartLogo from "../CartMartLogo";
import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";
import AuthInputGroup from "./AuthInputGroup";

const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex gap-8 items-center sm:justify-center border-b bg-neutral-100 p-[16px] flex-col sm:flex-row">
      <div className="flex w-full shrink-0 sm:w-auto justify-between items-center gap-4">
        <Link href="/" className="shrink-0  flex items-center gap-2">
          <CartMartLogo />
          <h1 className="text-logo-text">CartMart</h1>
        </Link>

        <div className="sm:hidden">
          <UserAvatar className="sm:hidden border border-border h-16 w-16" />
        </div>
      </div>

      <SearchBar />

      <AuthInputGroup />
    </header>
  );
};

export default Header;
