import { Navbar } from "@/components/navbar/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p>
              These terms and conditions govern your use of Shop African Brands marketplace.
              By using our website, you accept these terms and conditions in full.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
            <p className="mb-4">
              You must be at least 18 years of age to use this website. You must provide
              truthful and accurate information when registering for an account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Privacy Policy</h2>
            <p className="mb-4">
              Your privacy is important to us. Please refer to our Privacy Policy for
              information about how we collect, use, and protect your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, and images,
              is the property of Shop African Brands or its content suppliers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;