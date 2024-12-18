import { Fragment } from "react";
import { Hero } from "@/components/Hero";
import { DealOfTheDay } from "@/components/DealOfTheDay";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { NewArrivals } from "@/components/NewArrivals";
import { BestSellers } from "@/components/BestSellers";
import { PromoSection } from "@/components/PromoSection";
import { Newsletter } from "@/components/Newsletter";
import { DiscountBanner } from "@/components/discounts/DiscountBanner";

const Index = () => {
  return (
    <Fragment>
      <DiscountBanner />
      <Hero />
      <DealOfTheDay />
      <FeaturedCategories />
      <NewArrivals />
      <BestSellers />
      <PromoSection />
      <Newsletter />
    </Fragment>
  );
};

export default Index;