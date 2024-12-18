import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Edit, Trash, Eye, EyeOff } from "lucide-react";
import { StaticPage } from "@/types/static-page";

interface StaticPageListProps {
  pages: StaticPage[];
  onEdit: (page: StaticPage) => void;
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string, status: string) => Promise<void>;
}

export const StaticPageList = ({
  pages,
  onEdit,
  onDelete,
  onStatusChange,
}: StaticPageListProps) => {
  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <Card key={page.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">{page.title}</h3>
                  <p className="text-sm text-gray-500">/{page.slug}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated: {new Date(page.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {page.status === 'draft' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStatusChange(page.id, 'published')}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStatusChange(page.id, 'draft')}
                  >
                    <EyeOff className="h-4 w-4 mr-1" />
                    Unpublish
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(page)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(page.id)}
                >
                  <Trash className="h-4 w-4 mr-1" />
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