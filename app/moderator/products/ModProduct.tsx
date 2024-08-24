import { Product } from "@/app/api/product/route";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ModProductProps = {
  product: Product;
  onSelect: () => void;
  onDelete: () => void;
  onDeleteSelect: () => void;
};

export default function ModProduct({
  product,
  onSelect,
  onDelete,
  onDeleteSelect,
}: ModProductProps) {
  return (
    <div className="border p-4 rounded shadow cursor-pointer max-h-[250px] flex flex-col justify-between gap-2">
      <h2 className="text-lg font-bold line-clamp-2">{product.name}</h2>
      <p className="text-sm line-clamp-2">{product.description}</p>
      <p className="text-sm font-bold">${product.price}</p>
      <p className="text-sm">Rating: {product.rating}</p>
      <div className="flex gap-2">
        <Button
          className="flex-1 hover:opacity-90 hover:bg-primary"
          onClick={onSelect}
        >
          Update
        </Button>

        <AlertDialog>
          <AlertDialogTrigger
            className="flex-1 bg-destructive hover:bg-destructive/90 text-white rounded-lg"
            onClick={onDeleteSelect}
          >
            Delete
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90"
                onClick={onDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
