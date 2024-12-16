import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContentBlock {
  id: string;
  name: string;
  content: any;
  type: string;
  status: string;
  page: string | null;
}

export const ContentBlockManager = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [page, setPage] = useState("");

  useEffect(() => {
    fetchBlocks();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('content-block-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content_blocks' },
        () => {
          fetchBlocks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBlocks = async () => {
    try {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlocks(data || []);
    } catch (error) {
      console.error('Error fetching content blocks:', error);
      toast.error("Failed to load content blocks");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contentJson = type === 'json' ? JSON.parse(content) : content;
      
      const { error } = await supabase.from('content_blocks').insert([
        {
          name,
          content: contentJson,
          type,
          page,
          status: 'draft'
        }
      ]);

      if (error) throw error;

      toast.success("Content block created successfully");
      setName("");
      setContent("");
      setType("text");
      setPage("");
    } catch (error) {
      console.error('Error creating content block:', error);
      toast.error("Failed to create content block");
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
    } catch (error) {
      console.error('Error deleting content block:', error);
      toast.error("Failed to delete content block");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('content_blocks')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Content block ${newStatus}`);
    } catch (error) {
      console.error('Error updating content block status:', error);
      toast.error("Failed to update content block status");
    }
  };

  if (loading) {
    return <div>Loading content blocks...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Content Block</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Page</label>
              <Input
                value={page}
                onChange={(e) => setPage(e.target.value)}
                placeholder="e.g., home, about, contact"
              />
            </div>
            <Button type="submit">Create Content Block</Button>
          </form>
        </CardContent>
      </Card>

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
    </div>
  );
};