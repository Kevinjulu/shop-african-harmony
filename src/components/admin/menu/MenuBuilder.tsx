import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { MenuItemComponent } from "./MenuItem";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MenuItem {
  id: string;
  label: string;
  url: string;
  position: number;
  parent_id?: string | null;
}

export const MenuBuilder = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItemLabel, setNewItemLabel] = useState("");
  const [newItemUrl, setNewItemUrl] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update positions
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          position: index + 1,
        }));

        // Save to database
        updateMenuPositions(updatedItems);
        return updatedItems;
      });
    }
  };

  const updateMenuPositions = async (items: MenuItem[]) => {
    try {
      const { error } = await supabase
        .from('navigation_menus')
        .upsert(
          items.map(item => ({
            id: item.id,
            position: item.position,
          }))
        );

      if (error) throw error;
      toast.success("Menu order updated successfully");
    } catch (error) {
      console.error('Error updating menu positions:', error);
      toast.error("Failed to update menu order");
    }
  };

  const addMenuItem = async () => {
    if (!newItemLabel || !newItemUrl) {
      toast.error("Please fill in both label and URL");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('navigation_menus')
        .insert([
          {
            label: newItemLabel,
            url: newItemUrl,
            position: menuItems.length + 1,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setMenuItems([...menuItems, data as MenuItem]);
      setNewItemLabel("");
      setNewItemUrl("");
      toast.success("Menu item added successfully");
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast.error("Failed to add menu item");
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('navigation_menus')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMenuItems(menuItems.filter(item => item.id !== id));
      toast.success("Menu item deleted successfully");
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error("Failed to delete menu item");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Menu Builder</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Menu Item Label"
          value={newItemLabel}
          onChange={(e) => setNewItemLabel(e.target.value)}
        />
        <Input
          placeholder="Menu Item URL"
          value={newItemUrl}
          onChange={(e) => setNewItemUrl(e.target.value)}
        />
      </div>

      <Button onClick={addMenuItem} className="mb-6">
        Add Menu Item
      </Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={menuItems}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {menuItems.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                onDelete={() => deleteMenuItem(item.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};