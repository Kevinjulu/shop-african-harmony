import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { 
    name: "Maasai Beads", 
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Ankara Fabric", 
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Traditional Jewelry", 
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Home Decor", 
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60" 
  },
];

export const FeaturedCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-secondary mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-3">
                <div className="aspect-[4/3] relative mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover rounded-lg w-full h-full"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-medium text-center group-hover:text-primary transition-colors">
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