import { StaticPageManager } from "@/components/admin/content/static-pages/StaticPageManager";

const StaticPagesPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Static Pages</h1>
      <StaticPageManager />
    </div>
  );
};

export default StaticPagesPage;