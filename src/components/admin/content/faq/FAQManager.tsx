import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FAQForm } from "./FAQForm";
import { FAQList } from "./FAQList";
import { FAQ, FAQFormData } from "@/types/faq";
import { useAuth } from "@/components/AuthProvider";

export const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchFaqs();
    
    const channel = supabase
      .channel('faq-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'faqs' },
        () => {
          fetchFaqs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: FAQFormData) => {
    try {
      if (editingFaq) {
        const { error } = await supabase
          .from('faqs')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingFaq.id);

        if (error) throw error;
        toast.success("FAQ updated successfully");
        setEditingFaq(null);
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert([{
            ...formData,
            created_by: user?.id
          }]);

        if (error) throw error;
        toast.success("FAQ created successfully");
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast.error("Failed to save FAQ");
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
  };

  if (loading) {
    return <div>Loading FAQs...</div>;
  }

  return (
    <div className="space-y-6">
      <FAQForm
        onSubmit={handleSubmit}
        initialData={editingFaq ? {
          question: editingFaq.question,
          answer: editingFaq.answer,
          category: editingFaq.category || "",
          display_order: editingFaq.display_order
        } : undefined}
        buttonText={editingFaq ? "Update FAQ" : "Add FAQ"}
      />
      <FAQList
        faqs={faqs}
        onEdit={handleEdit}
        onRefetch={fetchFaqs}
      />
    </div>
  );
};