import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Vendor {
  id: string;
  name: string;
  products: number;
  revenue: string;
  status: "active" | "pending" | "suspended";
}

const vendors: Vendor[] = [
  {
    id: "1",
    name: "African Crafts Co.",
    products: 45,
    revenue: "$12,234",
    status: "active",
  },
  {
    id: "2",
    name: "Sahara Textiles",
    products: 32,
    revenue: "$8,456",
    status: "active",
  },
  {
    id: "3",
    name: "Tribal Arts Ltd",
    products: 12,
    revenue: "$3,789",
    status: "pending",
  },
];

export const VendorTable = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>{vendor.products}</TableCell>
              <TableCell>{vendor.revenue}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    vendor.status === "active"
                      ? "success"
                      : vendor.status === "pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {vendor.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};