import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";

const stats = [
  {
    title: "Total Sales",
    value: "$12,345",
    icon: DollarSign,
    change: "+12%",
  },
  {
    title: "Active Products",
    value: "45",
    icon: Package,
    change: "+3",
  },
  {
    title: "Orders",
    value: "126",
    icon: ShoppingBag,
    change: "+18%",
  },
  {
    title: "Customers",
    value: "89",
    icon: Users,
    change: "+7%",
  },
];

export const VendorStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};