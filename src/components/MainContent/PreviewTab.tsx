import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon } from 'lucide-react';

export function PreviewTab() {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Product Preview</h3>
          <p className="text-gray-500">
            Drag and adjust your design on the product to see how it will look.
          </p>
          <div className="space-y-2">
            <Label>Size</Label>
            <Input type="range" />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="X" />
              <Input type="number" placeholder="Y" />
            </div>
          </div>
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Save Design
          </Button>
        </div>
      </div>
    </Card>
  );
}