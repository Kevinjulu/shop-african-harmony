import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export const useProducts = (searchQuery?: string, category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products with:', { searchQuery, category });
        
        // Improved mock data with better image-product correspondence
        const mockProducts = [
          {
            id: 1,
            name: "Maasai Beaded Necklace",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
            category: "Jewelry",
            description: "Authentic Maasai beaded necklace handcrafted by skilled artisans"
          },
          {
            id: 2,
            name: "Ankara Print Tote Bag",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60",
            category: "Fashion",
            description: "Stylish tote bag made with authentic Ankara fabric"
          },
          {
            id: 3,
            name: "African Tribal Wall Art",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
            category: "Art",
            description: "Hand-painted tribal wall art depicting traditional African motifs"
          },
          {
            id: 4,
            name: "Maasai Beaded Bracelet Set",
            price: 34.99,
            image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60",
            category: "Jewelry",
            description: "Set of three handmade Maasai beaded bracelets"
          },
          {
            id: 5,
            name: "Handwoven African Basket",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
            category: "Home Decor",
            description: "Traditional handwoven basket perfect for storage or decoration"
          },
          {
            id: 6,
            name: "African Djembe Drum",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1516663235285-845fac339ca7?w=800&auto=format&fit=crop&q=60",
            category: "Musical Instruments",
            description: "Authentic hand-carved Djembe drum with goatskin head"
          },
          {
            id: 7,
            name: "Ankara Print Dress",
            price: 119.99,
            image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60",
            category: "Fashion",
            description: "Modern dress made with vibrant Ankara fabric"
          },
          {
            id: 8,
            name: "African Print Throw Pillows",
            price: 45.99,
            image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
            category: "Home Decor",
            description: "Set of decorative pillows featuring African prints"
          },
          {
            id: 9,
            name: "Maasai Belt",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
            category: "Fashion",
            description: "Traditional Maasai beaded belt handcrafted by artisans"
          },
          {
            id: 10,
            name: "African Wooden Sculpture",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
            category: "Art",
            description: "Hand-carved wooden sculpture representing African heritage"
          }
        ];

        // Improved filtering logic
        let filteredProducts = mockProducts;
        
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower) ||
            product.description?.toLowerCase().includes(searchLower)
          );
        }

        if (category && category !== 'all') {
          filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
          );
        }

        setProducts(filteredProducts);
        console.log('Filtered products:', filteredProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, category]);

  return { products, loading, error };
};