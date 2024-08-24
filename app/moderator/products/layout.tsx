import FiltersColumn from "@/app/(header)/products/FiltersColumn";

export default function Layout_Mod_Products({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full container flex flex-row gap-4 mt-4">
      <FiltersColumn />
      {children}
    </div>
  );
}
