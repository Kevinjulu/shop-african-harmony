import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { 
    name: "Maasai Jewelry", 
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Ankara Fashion", 
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Traditional Art", 
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Home Decor", 
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Beaded Accessories", 
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60" 
  },
  { 
    name: "Cultural Wear", 
    image: "https://images.unsplash.com/photo-1590735213408-9d0cd4b24fd7?w=800&auto=format&fit=crop&q=60" 
  },
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
                    loading="lazy"
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