import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";
import { Category } from "@/types/admin";

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  editingCategory: Category | null;
  onEditChange: (field: string, value: string) => void;
  onSave: (id: string) => void;
}

export const CategoryList = ({
  categories,
  onEdit,
  onDelete,
  editingCategory,
  onEditChange,
  onSave,
}: CategoryListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              {editingCategory?.id === category.id ? (
                <Input
                  value={editingCategory.name}
                  onChange={(e) => onEditChange("name", e.target.value)}
                />
              ) : (
                category.name
              )}
            </TableCell>
            <TableCell>
              {editingCategory?.id === category.id ? (
                <Input
                  value={editingCategory.description || ""}
                  onChange={(e) => onEditChange("description", e.target.value)}
                />
              ) : (
                category.description
              )}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {editingCategory?.id === category.id ? (
                  <Button
                    variant="outline"
                    onClick={() => onSave(category.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => onEdit(category)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => onDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};