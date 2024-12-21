import { Hero } from "@/components/Hero";
import { OngoingMarketDay } from "@/components/OngoingMarketDay";
import { NewArrivals } from "@/components/NewArrivals";
import { BestSellers } from "@/components/BestSellers";
import { TrendingProducts } from "@/components/TrendingProducts";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { TopCategories } from "@/components/TopCategories";
import { PromoSection } from "@/components/PromoSection";
import { Newsletter } from "@/components/Newsletter";
import { DiscountBanner } from "@/components/discounts/DiscountBanner";

const Home = () => {
  console.log("Rendering Home page");
  
  return (
    <div className="min-h-screen">
      <DiscountBanner />
      <Hero />
      <OngoingMarketDay />
      <TopCategories />
      <NewArrivals />
      <FeaturedCategories />
      <TrendingProducts />
      <BestSellers />
      <PromoSection />
      <Newsletter />
    </div>
  );
};

export default Home;