import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { CategoryFormData } from "@/types/admin";
import { toast } from "sonner";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  initialData?: CategoryFormData;
  buttonText?: string;
}

export const CategoryForm = ({ onSubmit, initialData, buttonText = "Add Category" }: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>(
    initialData || { name: "", description: "" }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({ name: "", description: "" });
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Failed to submit category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Category Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <Button type="submit">
        <Plus className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
    </form>
  );
};