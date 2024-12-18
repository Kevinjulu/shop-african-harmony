import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export const useProducts = (searchQuery?: string, category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products with:', { searchQuery, category });
        
        // Mock data with origin countries
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Maasai Beaded Necklace",
            price: 49.99,
            image_url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
            category: "Jewelry",
            description: "Authentic Maasai beaded necklace handcrafted by skilled artisans",
            status: "published",
            category_id: "jewelry-1",
            inventory_quantity: 10,
            stock: 10,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-1",
            origin_country: "KE",
            images: [
              {
                url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
                alt: "Maasai Beaded Necklace"
              }
            ]
          },
          {
            id: "2",
            name: "Ankara Print Tote Bag",
            price: 79.99,
            image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60",
            category: "Fashion",
            description: "Stylish tote bag made with authentic Ankara fabric",
            status: "published",
            category_id: "fashion-1",
            inventory_quantity: 5,
            stock: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-2",
            images: [
              {
                url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60",
                alt: "Ankara Print Tote Bag"
              }
            ]
          },
          {
            id: "3",
            name: "African Tribal Wall Art",
            price: 129.99,
            image_url: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
            category: "Art",
            description: "Hand-painted tribal wall art depicting traditional African motifs",
            status: "published",
            category_id: "art-1",
            inventory_quantity: 2,
            stock: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-3",
            images: [
              {
                url: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
                alt: "African Tribal Wall Art"
              }
            ]
          },
          {
            id: "4",
            name: "Maasai Beaded Bracelet Set",
            price: 34.99,
            image_url: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60",
            category: "Jewelry",
            description: "Set of three handmade Maasai beaded bracelets",
            status: "published",
            category_id: "jewelry-2",
            inventory_quantity: 15,
            stock: 15,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-4",
            images: [
              {
                url: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&auto=format&fit=crop&q=60",
                alt: "Maasai Beaded Bracelet Set"
              }
            ]
          },
          {
            id: "5",
            name: "Handwoven African Basket",
            price: 89.99,
            image_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
            category: "Home Decor",
            description: "Traditional handwoven basket perfect for storage or decoration",
            status: "published",
            category_id: "home-decor-1",
            inventory_quantity: 8,
            stock: 8,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-5",
            images: [
              {
                url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
                alt: "Handwoven African Basket"
              }
            ]
          },
          {
            id: "6",
            name: "African Djembe Drum",
            price: 199.99,
            image_url: "https://images.unsplash.com/photo-1516663235285-845fac339ca7?w=800&auto=format&fit=crop&q=60",
            category: "Musical Instruments",
            description: "Authentic hand-carved Djembe drum with goatskin head",
            status: "published",
            category_id: "musical-instruments-1",
            inventory_quantity: 3,
            stock: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-6",
            images: [
              {
                url: "https://images.unsplash.com/photo-1516663235285-845fac339ca7?w=800&auto=format&fit=crop&q=60",
                alt: "African Djembe Drum"
              }
            ]
          },
          {
            id: "7",
            name: "Ankara Print Dress",
            price: 119.99,
            image_url: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60",
            category: "Fashion",
            description: "Modern dress made with vibrant Ankara fabric",
            status: "published",
            category_id: "fashion-3",
            inventory_quantity: 7,
            stock: 7,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-7",
            images: [
              {
                url: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&auto=format&fit=crop&q=60",
                alt: "Ankara Print Dress"
              }
            ]
          },
          {
            id: "8",
            name: "African Print Throw Pillows",
            price: 45.99,
            image_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
            category: "Home Decor",
            description: "Set of decorative pillows featuring African prints",
            status: "published",
            category_id: "home-decor-2",
            inventory_quantity: 12,
            stock: 12,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-8",
            images: [
              {
                url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&auto=format&fit=crop&q=60",
                alt: "African Print Throw Pillows"
              }
            ]
          },
          {
            id: "9",
            name: "Maasai Belt",
            price: 59.99,
            image_url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
            category: "Fashion",
            description: "Traditional Maasai beaded belt handcrafted by artisans",
            status: "published",
            category_id: "fashion-4",
            inventory_quantity: 20,
            stock: 20,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-9",
            images: [
              {
                url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=60",
                alt: "Maasai Belt"
              }
            ]
          },
          {
            id: "10",
            name: "African Wooden Sculpture",
            price: 149.99,
            image_url: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
            category: "Art",
            description: "Hand-carved wooden sculpture representing African heritage",
            status: "published",
            category_id: "art-2",
            inventory_quantity: 4,
            stock: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            vendor_id: "vendor-10",
            images: [
              {
                url: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&auto=format&fit=crop&q=60",
                alt: "African Wooden Sculpture"
              }
            ]
          }
        ];

        let filteredProducts = mockProducts;
        
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.category?.toLowerCase().includes(searchLower) ||
            product.description?.toLowerCase().includes(searchLower)
          );
        }

        if (category && category !== 'all') {
          filteredProducts = filteredProducts.filter(product =>
            product.category?.toLowerCase() === category.toLowerCase()
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
