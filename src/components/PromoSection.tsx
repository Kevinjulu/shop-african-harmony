import { Link } from "react-router-dom";

const promos = [
  {
    title: "Traditional Crafts",
    description: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    link: "/products?category=traditional"
  },
  {
    title: "New Collection",
    description: "Special Prices",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    link: "/products?collection=new"
  },
  {
    title: "African Art",
    description: "Featured Items",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    link: "/products?category=art"
  }
];

export const PromoSection = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-secondary mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <Link
              key={index}
              to={promo.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[16/9] relative">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-lg">{promo.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};