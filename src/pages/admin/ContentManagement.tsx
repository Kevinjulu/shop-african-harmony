import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BannerManager } from "@/components/admin/content/BannerManager";
import { ContentBlockManager } from "@/components/admin/content/ContentBlockManager";

const ContentManagement = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      
      <Tabs defaultValue="banners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="banners">Promotional Banners</TabsTrigger>
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