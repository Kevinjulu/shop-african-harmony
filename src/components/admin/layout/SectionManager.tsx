import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSection } from "./SortableSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Section {
  id: string;
  name: string;
  type: string;
  position: number;
  isActive: boolean;
}

export const SectionManager = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: "hero", name: "Hero Section", type: "hero", position: 1, isActive: true },
    { id: "featured", name: "Featured Products", type: "products", position: 2, isActive: true },
    { id: "categories", name: "Categories", type: "categories", position: 3, isActive: true },
    { id: "trending", name: "Trending Products", type: "products", position: 4, isActive: true },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update positions
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          position: index + 1,
        }));

        // Save to database
        updateSectionPositions(updatedItems);
        return updatedItems;
      });
    }
  };

  const updateSectionPositions = async (sections: Section[]) => {
    try {
      const { error } = await supabase
        .from('content_blocks')
        .upsert(
          sections.map(section => ({
            id: section.id,
            position: section.position,
          }))
        );

      if (error) throw error;
      toast.success("Section order updated successfully");
    } catch (error) {
      console.error('Error updating section positions:', error);
      toast.error("Failed to update section order");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Page Sections</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Drag and drop sections to reorder them on the page
        </p>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                onToggle={(id) => {
                  setSections(sections.map(s => 
                    s.id === id ? { ...s, isActive: !s.isActive } : s
                  ));
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};