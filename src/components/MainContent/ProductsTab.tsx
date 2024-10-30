import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PrintifyClient } from '@/lib/printify';
import { PrintifyProduct } from '@/types/printify';
import { useToast } from '@/hooks/use-toast';
import { Package } from 'lucide-react';

interface ProductsTabProps {
  printifyClient: PrintifyClient;
}

export function ProductsTab({ printifyClient }: ProductsTabProps) {
  const [products, setProducts] = useState<PrintifyProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await printifyClient.getProducts();
        setProducts(response.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [printifyClient]);

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <Package className="h-8 w-8 text-gray-400 animate-pulse" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {selectedProducts.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Selected Products</h3>
              <p className="text-sm text-gray-500">
                {selectedProducts.length} products selected
              </p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600">
              Add Designs
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative group"
              >
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => handleProductSelect(product.id)}
                  className="absolute top-2 right-2 z-10"
                />
                <Card className="overflow-hidden hover:border-green-500 transition-colors">
                  {product.images[0] && (
                    <img
                      src={product.images[0].preview_url}
                      alt={product.title}
                      className="w-full aspect-square object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-500">
                      From ${product.cost.value} {product.cost.currency}
                    </p>
                    <div className="mt-2 text-xs text-gray-400">
                      {product.variants.length} variants available
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}