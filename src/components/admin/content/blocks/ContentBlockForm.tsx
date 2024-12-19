import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContentBlock } from "./types";

interface ContentBlockFormProps {
  onSuccess: () => void;
  block?: ContentBlock | null;
}

export const ContentBlockForm = ({ onSuccess, block }: ContentBlockFormProps) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [page, setPage] = useState("");

  useEffect(() => {
    if (block) {
      setName(block.name);
      setContent(typeof block.content === 'object' ? JSON.stringify(block.content, null, 2) : block.content);
      setType(block.type);
      setPage(block.page || "");
    }
  }, [block]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contentJson = type === 'json' ? JSON.parse(content) : content;
      
      if (block) {
        const { error } = await supabase
          .from('content_blocks')
          .update({
            name,
            content: contentJson,
            type,
            page,
          })
          .eq('id', block.id);

        if (error) throw error;
        toast.success("Content block updated successfully");
      } else {
        const { error } = await supabase
          .from('content_blocks')
          .insert([{
            name,
            content: contentJson,
            type,
            page,
            status: 'draft'
          }]);

        if (error) throw error;
        toast.success("Content block created successfully");
      }

      setName("");
      setContent("");
      setType("text");
      setPage("");
      onSuccess();
    } catch (error) {
      console.error('Error managing content block:', error);
      toast.error(block ? "Failed to update content block" : "Failed to create content block");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{block ? "Edit Content Block" : "Create New Content Block"}</CardTitle>
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
          <Button type="submit">{block ? "Update" : "Create"} Content Block</Button>
        </form>
      </CardContent>
    </Card>
  );
};