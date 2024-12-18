import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BannerManager } from "@/components/admin/content/BannerManager";
import { ContentBlockManager } from "@/components/admin/content/ContentBlockManager";

const ContentManagement = () => {
  console.log("Rendering ContentManagement page");
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      
      <Tabs defaultValue="banners" className="w-full">
        <TabsList>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="content-blocks">Content Blocks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="banners">
          <BannerManager />
        </TabsContent>
        
        <TabsContent value="content-blocks">
          <ContentBlockManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;