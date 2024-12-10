import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Maasai Jewelry", image: "/placeholder.svg" },
  { name: "Ankara Fashion", image: "/placeholder.svg" },
  { name: "Traditional Art", image: "/placeholder.svg" },
  { name: "Home Decor", image: "/placeholder.svg" },
  { name: "Beaded Accessories", image: "/placeholder.svg" },
  { name: "Cultural Wear", image: "/placeholder.svg" },
];

export const TopCategories = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-secondary mb-6">
          Top Categories Of The Month
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="aspect-square relative mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-sm text-center font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};