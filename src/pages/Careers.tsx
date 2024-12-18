import { Navbar } from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Careers = () => {
  const positions = [
    {
      title: "Senior Product Manager",
      department: "Product",
      location: "Nairobi, Kenya",
      type: "Full-time"
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Customer Support Specialist",
      department: "Support",
      location: "Lagos, Nigeria",
      type: "Full-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Careers at Shop African Brand</h1>
        
        <div className="bg-primary/10 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
          <p className="text-lg mb-6">
            Help us build the future of African e-commerce. We're looking for passionate
            individuals who want to make a difference in the African marketplace.
          </p>
          <Button className="bg-mart-yellow hover:bg-mart-yellow/90 text-black">
            View All Positions
          </Button>
        </div>

        <div className="grid gap-6">
          {positions.map((position) => (
            <div key={position.title} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span>{position.department}</span>
                <span>•</span>
                <span>{position.location}</span>
                <span>•</span>
                <span>{position.type}</span>
              </div>
              <Button variant="outline">Apply Now</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;