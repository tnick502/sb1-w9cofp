import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { UploadTab } from '@/components/MainContent/UploadTab';
import { ProductsTab } from '@/components/MainContent/ProductsTab';
import { PreviewTab } from '@/components/MainContent/PreviewTab';
import { PrintifyAuth } from '@/components/Auth/PrintifyAuth';
import { PrintifyClient } from '@/lib/printify';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [printifyClient, setPrintifyClient] = useState<PrintifyClient | null>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleAuthenticated = (apiKey: string, storeId: string) => {
    setPrintifyClient(new PrintifyClient({ apiKey, selectedStoreId: storeId }));
  };

  if (!printifyClient) {
    return (
      <>
        <PrintifyAuth onAuthenticated={handleAuthenticated} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

        <main className="flex-1 p-6">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList>
              <TabsTrigger value="upload">Upload Designs</TabsTrigger>
              <TabsTrigger value="products">Select Products</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <UploadTab
                files={files}
                onFileDrop={handleFileDrop}
                printifyClient={printifyClient}
              />
            </TabsContent>

            <TabsContent value="products">
              <ProductsTab printifyClient={printifyClient} />
            </TabsContent>

            <TabsContent value="preview">
              <PreviewTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;