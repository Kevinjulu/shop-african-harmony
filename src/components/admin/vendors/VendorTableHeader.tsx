import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const VendorTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Vendor</TableHead>
        <TableHead>Products</TableHead>
        <TableHead>Revenue</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};