import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContentBlock } from "./types";

interface ContentBlockListProps {
  blocks: ContentBlock[];
  onRefetch: () => void;
  onEdit: (block: ContentBlock) => void;
}

export const ContentBlockList = ({ blocks, onRefetch, onEdit }: ContentBlockListProps) => {
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('content_blocks')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Content block ${newStatus}`);
      onRefetch();
    } catch (error) {
      console.error('Error updating content block status:', error);
      toast.error("Failed to update content block status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_blocks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success("Content block deleted successfully");
      onRefetch();
    } catch (error) {
      console.error('Error deleting content block:', error);
      toast.error("Failed to delete content block");
    }
  };

  return (
    <div className="grid gap-6">
      {blocks.map((block) => (
        <Card key={block.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{block.name}</h3>
                <p className="text-sm text-gray-500">Type: {block.type}</p>
                {block.page && (
                  <p className="text-sm text-gray-500">Page: {block.page}</p>
                )}
                <div className="mt-2 p-4 bg-gray-50 rounded-lg overflow-auto max-h-40">
                  <pre className="text-sm">
                    {typeof block.content === 'object'
                      ? JSON.stringify(block.content, null, 2)
                      : block.content}
                  </pre>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => onEdit(block)}
                >
                  Edit
                </Button>
                {block.status === 'draft' ? (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(block.id, 'published')}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(block.id, 'draft')}
                  >
                    Unpublish
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(block.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};