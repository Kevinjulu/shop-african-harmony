import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  item: {
    id: string;
    label: string;
    url: string;
  };
  onDelete: () => void;
}

export const MenuItemComponent = ({ item, onDelete }: MenuItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm"
    >
      <div className="flex items-center gap-4">
        <button
          className="cursor-grab hover:text-primary"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div>
          <p className="font-medium">{item.label}</p>
          <p className="text-sm text-gray-500">{item.url}</p>
        </div>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};