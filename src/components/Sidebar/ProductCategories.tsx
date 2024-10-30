import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const productCategories = [
  {
    title: 'Wall Art',
    items: ['Canvas Prints', 'Posters', 'Framed Posters', 'Wall Tapestries'],
  },
  {
    title: 'Clothing',
    items: ['T-Shirts', 'Hoodies', 'Tank Tops', 'Leggings'],
    new: ['Crop Tops', 'Athletic Wear'],
  },
  {
    title: 'Home & Living',
    items: ['Throw Pillows', 'Blankets', 'Mugs', 'Phone Cases'],
  },
  {
    title: 'Accessories',
    items: ['Tote Bags', 'Backpacks', 'Face Masks', 'Stickers'],
    new: ['Laptop Sleeves'],
  },
];

export function ProductCategories() {
  return (
    <>
      {productCategories.map((category) => (
        <div key={category.title} className="py-2 px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{category.title}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <ul className="space-y-2 ml-4">
            {category.items.map((item) => (
              <li key={item} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                {item}
              </li>
            ))}
            {category.new?.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                {item}
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">New</Badge>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}