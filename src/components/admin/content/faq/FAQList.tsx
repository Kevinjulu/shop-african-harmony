import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FAQ } from "@/types/faq";
import { Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FAQListProps {
  faqs: FAQ[];
  onEdit: (faq: FAQ) => void;
  onRefetch: () => void;
}

export const FAQList = ({ faqs, onEdit, onRefetch }: FAQListProps) => {
  const handleStatusChange = async (id: string, isPublished: boolean) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_published: isPublished })
        .eq('id', id);

      if (error) throw error;
      toast.success(`FAQ ${isPublished ? 'published' : 'unpublished'}`);
      onRefetch();
    } catch (error) {
      console.error('Error updating FAQ status:', error);
      toast.error("Failed to update FAQ status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("FAQ deleted successfully");
      onRefetch();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <Card key={faq.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  {faq.category && <span>Category: {faq.category}</span>}
                  <span>Order: {faq.display_order}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {faq.is_published ? (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(faq.id, false)}
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(faq.id, true)}
                  >
                    Publish
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => onEdit(faq)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(faq.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};