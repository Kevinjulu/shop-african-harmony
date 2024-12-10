import { Truck, CreditCard, HeadphonesIcon, Settings } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "2-3 day delivery within Africa",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple payment options",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Dedicated customer support",
  },
  {
    icon: Settings,
    title: "Quality Service",
    description: "Authentic African crafts",
  },
];

export const ServiceFeatures = () => {
  return (
    <section className="bg-white py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <feature.icon className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="font-medium text-secondary">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};