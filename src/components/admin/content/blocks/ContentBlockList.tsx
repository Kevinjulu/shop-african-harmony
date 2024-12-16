import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContentBlock {
  id: string;
  name: string;
  content: any;
  type: string;
  status: string;
  page: string | null;
}

interface ContentBlockListProps {
  blocks: ContentBlock[];
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const ContentBlockList = ({ blocks, onStatusChange, onDelete }: ContentBlockListProps) => {
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
                {block.status === 'draft' ? (
                  <Button
                    variant="outline"
                    onClick={() => onStatusChange(block.id, 'published')}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => onStatusChange(block.id, 'draft')}
                  >
                    Unpublish
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => onDelete(block.id)}
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