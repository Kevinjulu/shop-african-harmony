import { Fragment } from "react";
import { Hero } from "@/components/Hero";
import { DealOfTheDay } from "@/components/DealOfTheDay";
import { NewArrivals } from "@/components/NewArrivals";
import { BestSellers } from "@/components/BestSellers";
import { TrendingProducts } from "@/components/TrendingProducts";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { TopCategories } from "@/components/TopCategories";
import { PromoSection } from "@/components/PromoSection";
import { Newsletter } from "@/components/Newsletter";
import { DiscountBanner } from "@/components/discounts/DiscountBanner";

const Index = () => {
  return (
    <Fragment>
      <DiscountBanner />
      <Hero />
      <DealOfTheDay />
      <TopCategories />
      <NewArrivals />
      <FeaturedCategories />
      <TrendingProducts />
      <BestSellers />
      <PromoSection />
      <Newsletter />
    </Fragment>
  );
};

export default Index;