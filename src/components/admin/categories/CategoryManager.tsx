import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const CategoryManager = () => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("categories").insert([
        {
          name: newCategory.name,
          description: newCategory.description,
        },
      ]);

      if (error) throw error;

      toast.success("Category added successfully");
      setNewCategory({ name: "", description: "" });
      refetch();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  const handleUpdateCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from("categories")
        .update({
          name: editingCategory.name,
          description: editingCategory.description,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Category updated successfully");
      setEditingCategory(null);
      refetch();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Category deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <Input
                placeholder="Category Name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Category Description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, description: e.target.value })
                }
              />
            </div>
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
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
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingCategory?.id === category.id ? (
                      <Input
                        value={editingCategory.description}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            description: e.target.value,
                          })
                        }
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
                          onClick={() => handleUpdateCategory(category.id)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          onClick={() => setEditingCategory(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};