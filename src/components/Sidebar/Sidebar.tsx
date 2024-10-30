import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  FolderPlus,
  Image as ImageIcon,
  LayoutGrid,
  Package,
  Palette,
  PanelLeft,
  Upload,
  Wand2,
} from 'lucide-react';
import { ProductCategories } from './ProductCategories';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-80 p-0 border-r"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <ScrollArea className="h-full py-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="products">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  <span>Products</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ProductCategories />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bundles">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5" />
                  <span>Bundles</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Create New Bundle
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="designs">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  <span>Designs</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 px-4 py-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Create Collection
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Product Templates
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="seo">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  <span>SEO Creation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Prompt Studio
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="listings">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <PanelLeft className="h-5 w-5" />
                  <span>Edit Listings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2">
                  {/* Add listing management options here */}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}