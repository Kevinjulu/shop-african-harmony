import { Hero } from "@/components/Hero";
import { ServiceFeatures } from "@/components/ServiceFeatures";
import { NewArrivals } from "@/components/NewArrivals";
import { BestSellers } from "@/components/BestSellers";
import { TrendingProducts } from "@/components/TrendingProducts";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { PromoSection } from "@/components/PromoSection";
import { ProductCategories } from "@/components/ProductCategories";
import { Newsletter } from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <ServiceFeatures />
      <NewArrivals />
      <BestSellers />
      <TrendingProducts />
      <PromoSection />
      <ProductCategories />
      <FeaturedCategories />
      <Newsletter />
    </div>
  );
};

export default Index;