import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SectionProps {
  section: {
    id: string;
    name: string;
    type: string;
    isActive: boolean;
  };
  onToggle: (id: string) => void;
}

export const SortableSection = ({ section, onToggle }: SectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

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
        <span className="font-medium">{section.name}</span>
        <span className="text-sm text-gray-500">{section.type}</span>
      </div>
      <Switch
        checked={section.isActive}
        onCheckedChange={() => onToggle(section.id)}
      />
    </div>
  );
};