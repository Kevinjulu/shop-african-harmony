import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StaticPageForm } from "./StaticPageForm";
import { StaticPageList } from "./StaticPageList";
import { StaticPage, StaticPageFormData } from "@/types/static-page";
import { useAuth } from "@/components/AuthProvider";

export const StaticPageManager = () => {
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<StaticPage | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPages();
    
    const channel = supabase
      .channel('static-pages-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'static_pages' },
        () => {
          fetchPages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('static_pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error("Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: StaticPageFormData) => {
    try {
      if (editingPage) {
        const { error } = await supabase
          .from('static_pages')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPage.id);

        if (error) throw error;
        toast.success("Page updated successfully");
        setEditingPage(null);
      } else {
        const { error } = await supabase
          .from('static_pages')
          .insert([{
            ...formData,
            created_by: user?.id
          }]);

        if (error) throw error;
        toast.success("Page created successfully");
      }
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error("Failed to save page");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('static_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Page deleted successfully");
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error("Failed to delete page");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('static_pages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Page ${status === 'published' ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      console.error('Error updating page status:', error);
      toast.error("Failed to update page status");
    }
  };

  if (loading) {
    return <div>Loading pages...</div>;
  }

  return (
    <div className="space-y-6">
      <StaticPageForm
        onSubmit={handleSubmit}
        initialData={editingPage ? {
          title: editingPage.title,
          slug: editingPage.slug,
          content: editingPage.content,
          meta_title: editingPage.meta_title || "",
          meta_description: editingPage.meta_description || "",
          status: editingPage.status
        } : undefined}
        buttonText={editingPage ? "Update Page" : "Create Page"}
      />
      <StaticPageList
        pages={pages}
        onEdit={setEditingPage}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};