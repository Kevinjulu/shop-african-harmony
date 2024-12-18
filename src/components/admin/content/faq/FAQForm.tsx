import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQFormData } from "@/types/faq";
import { toast } from "sonner";

interface FAQFormProps {
  onSubmit: (data: FAQFormData) => Promise<void>;
  initialData?: FAQFormData;
  buttonText?: string;
}

export const FAQForm = ({ onSubmit, initialData, buttonText = "Add FAQ" }: FAQFormProps) => {
  const [formData, setFormData] = useState<FAQFormData>(
    initialData || {
      question: "",
      answer: "",
      category: "",
      display_order: 0
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({ question: "", answer: "", category: "", display_order: 0 });
      }
    } catch (error) {
      console.error("Error submitting FAQ:", error);
      toast.error("Failed to submit FAQ");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit FAQ" : "Create New FAQ"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <Input
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Answer</label>
            <Textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., General, Products, Shipping"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Display Order</label>
            <Input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              min={0}
            />
          </div>
          <Button type="submit">{buttonText}</Button>
        </form>
      </CardContent>
    </Card>
  );
};