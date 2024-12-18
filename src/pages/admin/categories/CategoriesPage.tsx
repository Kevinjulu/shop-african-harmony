import { CategoryManager } from "@/components/admin/categories/CategoryManager";

const CategoriesPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      <CategoryManager />
    </div>
  );
};

export default CategoriesPage;