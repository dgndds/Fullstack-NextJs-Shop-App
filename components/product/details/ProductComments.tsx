import Separator from "@/components/ui/separator";

export default function ProductComments() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-title-3">Comments</h1>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <h2 className="text-subtitle-3">John Doe</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio vitae justo.
          </span>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <h2 className="text-subtitle-3">John Doe</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio vitae justo.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec nec odio vitae justo.
          </span>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <h2 className="text-subtitle-3">John Doe</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio vitae justo.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec nec odio vitae justo.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Donec nec odio vitae justo.
          </span>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <h2 className="text-subtitle-3">John Doe</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            odio vitae justo.
          </span>
        </div>
      </div>
    </div>
  );
}
