import { categories } from "@/data/categories";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

interface ShopSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  saleOnly: boolean;
  onSaleChange: (value: boolean) => void;
}

export function ShopSidebar({
  search,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
  saleOnly,
  onSaleChange,
}: ShopSidebarProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-2">
              <Checkbox
                id={cat.slug}
                checked={selectedCategories.includes(cat.slug)}
                onCheckedChange={() => onToggleCategory(cat.slug)}
              />
              <Label htmlFor={cat.slug} className="cursor-pointer text-sm font-normal">
                {cat.name} ({cat.productCount})
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Price</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
            className="w-20"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-20"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(checked) => onInStockChange(checked === true)}
            />
            <Label htmlFor="in-stock" className="cursor-pointer text-sm font-normal">
              In stock only
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="on-sale"
              checked={saleOnly}
              onCheckedChange={(checked) => onSaleChange(checked === true)}
            />
            <Label htmlFor="on-sale" className="cursor-pointer text-sm font-normal">
              On sale
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
