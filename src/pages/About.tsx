import { Navbar } from "@/components/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-secondary mb-6">About Shop African</h1>
        <p className="text-gray-600 mb-4">
          Shop African is your premier destination for authentic African crafts, connecting artisans
          with customers worldwide. Our platform showcases the rich cultural heritage of Africa
          through carefully curated collections of handmade items.
        </p>
        <p className="text-gray-600">
          We work directly with artisans and communities across Africa to bring you genuine,
          high-quality products while ensuring fair trade practices and supporting local economies.
        </p>
      </div>
    </div>
  );
};

export default About;