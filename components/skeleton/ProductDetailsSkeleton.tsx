export default function ProductDetailsSkeleton() {
  return (
    <div className="w-full flex flex-col gap-16 animate-pulse">
      <div className="flex flex-1 gap-8">
        <div className="flex-1 w-full h-[350px] bg-neutral-200" />
        <div className=" flex flex-col gap-6 flex-1 justify-around">
          <span className="h-8 w-full bg-neutral-200" />
          <span className="h-8 w-1/2 bg-neutral-200" />
          <span className="h-8 w-2/3 bg-neutral-200" />
          <span className="h-8 w-3/4 bg-neutral-200" />

          <span className="h-16 w-1/4 bg-neutral-200 self-center" />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <span className="h-8 w-[250px] bg-neutral-200" />
        <div className="flex flex-col gap-6 flex-1">
          <span className="h-8 bg-neutral-200" />
          <span className="h-8 bg-neutral-200" />
          <span className="h-8 bg-neutral-200" />
          <span className="h-8 bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
