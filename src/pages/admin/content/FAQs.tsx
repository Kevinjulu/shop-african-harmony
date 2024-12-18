import { FAQManager } from "@/components/admin/content/faq/FAQManager";

const FAQsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">FAQ Management</h1>
      <FAQManager />
    </div>
  );
};

export default FAQsPage;