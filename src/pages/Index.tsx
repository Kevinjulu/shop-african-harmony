import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceFeatures } from "@/components/ServiceFeatures";
import { DealOfTheDay } from "@/components/DealOfTheDay";
import { TopCategories } from "@/components/TopCategories";
import { FeaturedCategories } from "@/components/FeaturedCategories";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ServiceFeatures />
      <DealOfTheDay />
      <TopCategories />
      <FeaturedCategories />
    </div>
  );
};

export default Index;