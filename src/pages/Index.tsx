import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceFeatures } from "@/components/ServiceFeatures";
import { DealOfTheDay } from "@/components/DealOfTheDay";
import { TopCategories } from "@/components/TopCategories";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { PromoSection } from "@/components/PromoSection";
import { ProductCategories } from "@/components/ProductCategories";
import { Newsletter } from "@/components/Newsletter";
import { PromoSectionSecondary } from "@/components/PromoSectionSecondary";
import { NewArrivals } from "@/components/NewArrivals";
import { BestSellers } from "@/components/BestSellers";
import { TrendingProducts } from "@/components/TrendingProducts";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ServiceFeatures />
      <NewArrivals />
      <PromoSection />
      <DealOfTheDay />
      <BestSellers />
      <ProductCategories />
      <TopCategories />
      <TrendingProducts />
      <FeaturedCategories />
      <PromoSectionSecondary />
      <Newsletter />
    </div>
  );
};

export default Index;