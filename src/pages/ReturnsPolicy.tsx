import { Navbar } from "@/components/navbar/Navbar";

const ReturnsPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Return Policy</h2>
          <p className="mb-4">
            We accept returns within 30 days of delivery for most items in their original condition.
          </p>

          <h2 className="text-xl font-semibold mb-4">How to Return</h2>
          <ol className="list-decimal pl-6 mb-6">
            <li>Contact our customer service team</li>
            <li>Receive a return authorization number</li>
            <li>Pack the item securely with all original packaging</li>
            <li>Ship the item back to our return center</li>
          </ol>

          <h2 className="text-xl font-semibold mb-4">Refund Process</h2>
          <p className="mb-4">
            Refunds will be processed within 5-7 business days after receiving your return.
            The refund will be issued to your original payment method.
          </p>

          <h2 className="text-xl font-semibold mb-4">Non-Returnable Items</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Customized or personalized items</li>
            <li>Perishable goods</li>
            <li>Items marked as final sale</li>
            <li>Items without original packaging</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;