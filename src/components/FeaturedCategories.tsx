import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Maasai Beads", image: "/placeholder.svg" },
  { name: "Ankara Fabric", image: "/placeholder.svg" },
  { name: "Traditional Jewelry", image: "/placeholder.svg" },
  { name: "Home Decor", image: "/placeholder.svg" },
];

export const FeaturedCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-secondary mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center group-hover:text-primary transition-colors">
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