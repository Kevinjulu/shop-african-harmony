const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <p className="mb-4">
            We offer worldwide shipping on all orders. Delivery times may vary depending on your location:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>East Africa: 2-5 business days</li>
            <li>Rest of Africa: 5-10 business days</li>
            <li>International: 10-15 business days</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Shipping Costs</h2>
          <p className="mb-4">
            Shipping costs are calculated based on your location and the weight of your order:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Local delivery (within city): Free for orders over $50</li>
            <li>National shipping: Starting from $5</li>
            <li>International shipping: Starting from $15</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive a tracking number via email to monitor your delivery status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;