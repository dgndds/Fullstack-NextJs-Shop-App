import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function FiltersColumn() {
  return (
    <div className="w-[220px] p-2 border-r-[1px] border-[#e0e0e0] hidden sm:block">
      <h1 className="text-title-3 mb-4">Filters</h1>

      <div className="flex flex-col gap-8 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Category</h1>
          <div className="flex gap-2">
            <Checkbox id="electronics" />
            <label
              htmlFor="electronics"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Electronics
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox id="clothing" />
            <label
              htmlFor="clothing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Clothing
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox id="sony" />
            <label
              htmlFor="sony"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Home Appliances
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Brands</h1>
          <div className="flex gap-2 items-center">
            <Checkbox id="apple" />
            <label
              htmlFor="apple"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apple
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox id="samsung" />
            <label
              htmlFor="samsung"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Samsung
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox id="sony" />
            <label
              htmlFor="sony"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sony
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Price Range</h1>
          <div className="flex gap-2 items-center">
            <Checkbox id="low" />
            <label
              htmlFor="low"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              $0 - $50
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox id="mid" />
            <label
              htmlFor="mid"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              $51 - $100
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox id="high" />
            <label
              htmlFor="high"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              $101 - $200
            </label>
          </div>
        </div>
      </div>

      <Button type="submit" className="hidden sm:block hover:bg-primary-dark">
        Apply Filters
      </Button>
    </div>
  );
}
