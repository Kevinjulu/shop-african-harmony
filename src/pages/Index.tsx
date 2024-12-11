import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceFeatures } from "@/components/ServiceFeatures";
import { DealOfTheDay } from "@/components/DealOfTheDay";
import { TopCategories } from "@/components/TopCategories";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { PromoSection } from "@/components/PromoSection";
import { ProductCategories } from "@/components/ProductCategories";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ServiceFeatures />
      <PromoSection />
      <DealOfTheDay />
      <ProductCategories />
      <TopCategories />
      <FeaturedCategories />
    </div>
  );
};

export default Index;