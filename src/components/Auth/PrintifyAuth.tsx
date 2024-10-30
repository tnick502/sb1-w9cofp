import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PrintifyClient } from '@/lib/printify';
import { PrintifyStore } from '@/types/printify';
import { Key } from 'lucide-react';

interface PrintifyAuthProps {
  onAuthenticated: (apiKey: string, storeId: string) => void;
}

export function PrintifyAuth({ onAuthenticated }: PrintifyAuthProps) {
  const [apiKey, setApiKey] = useState('');
  const [stores, setStores] = useState<PrintifyStore[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleValidateKey = async () => {
    setIsValidating(true);
    try {
      const client = new PrintifyClient({ apiKey, selectedStoreId: null });
      const isValid = await client.validateApiKey();
      
      if (isValid) {
        const stores = await client.getStores();
        setStores(stores);
        toast({
          title: 'API Key Validated',
          description: 'Please select a store to continue.',
        });
      }
    } catch (error) {
      toast({
        title: 'Invalid API Key',
        description: 'Please check your API key and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId);
    onAuthenticated(apiKey, storeId);
  };

  return (
    <Card className="p-6 max-w-md mx-auto mt-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5 text-green-500" />
          <h2 className="text-lg font-semibold">Printify Authentication</h2>
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your Printify API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button
            className="w-full bg-green-500 hover:bg-green-600"
            onClick={handleValidateKey}
            disabled={!apiKey || isValidating}
          >
            {isValidating ? 'Validating...' : 'Validate API Key'}
          </Button>
        </div>

        {stores.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Select Store</label>
            <Select onValueChange={handleStoreSelect} value={selectedStore}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </Card>
  );
}