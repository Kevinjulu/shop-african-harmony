import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CategoryForm } from "./CategoryForm";
import { CategoryList } from "./CategoryList";
import { Category, CategoryFormData } from "@/types/admin";

export const CategoryManager = () => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Category[];
    },
  });

  const handleAddCategory = async (formData: CategoryFormData) => {
    const { error } = await supabase
      .from("categories")
      .insert([formData]);

    if (error) throw error;
    toast.success("Category added successfully");
    refetch();
  };

  const handleUpdateCategory = async (id: string) => {
    if (!editingCategory) return;

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
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
    toast.success("Category deleted successfully");
    refetch();
  };

  const handleEditChange = (field: string, value: string) => {
    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
        [field]: value,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm onSubmit={handleAddCategory} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryList
            categories={categories || []}
            onEdit={setEditingCategory}
            onDelete={handleDeleteCategory}
            editingCategory={editingCategory}
            onEditChange={handleEditChange}
            onSave={handleUpdateCategory}
          />
        </CardContent>
      </Card>
    </div>
  );
};