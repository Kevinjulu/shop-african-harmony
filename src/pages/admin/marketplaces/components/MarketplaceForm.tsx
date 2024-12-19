import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export interface MarketplaceFormData {
  name: string;
  location: string;
  country: string;
  description: string;
  schedule: string;
  next_market_date: Date | null;
  end_market_date: Date | null;
}

interface MarketplaceFormProps {
  formData: MarketplaceFormData;
  setFormData: (data: MarketplaceFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
  onCancel?: () => void;
}

export const MarketplaceForm = ({
  formData,
  setFormData,
  onSubmit,
  isEditing,
  onCancel,
}: MarketplaceFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Marketplace" : "Add New Marketplace"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              value={formData.schedule}
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>Next Market Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.next_market_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.next_market_date ? (
                    format(formData.next_market_date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.next_market_date || undefined}
                  onSelect={(date) =>
                    setFormData({ ...formData, next_market_date: date })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>End Market Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.end_market_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.end_market_date ? (
                    format(formData.end_market_date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.end_market_date || undefined}
                  onSelect={(date) =>
                    setFormData({ ...formData, end_market_date: date })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              {isEditing ? "Update Marketplace" : "Add Marketplace"}
            </Button>
            {isEditing && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};