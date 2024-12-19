import { Button } from "@/components/ui/button";

interface ProductFormActionsProps {
  isLoading: boolean;
  isEditing: boolean;
}

export const ProductFormActions = ({ isLoading, isEditing }: ProductFormActionsProps) => {
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? (
        <span>
          {isEditing ? "Updating Product..." : "Creating Product..."}
        </span>
      ) : (
        <span>
          {isEditing ? "Update Product" : "Create Product"}
        </span>
      )}
    </Button>
  );
};