import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Settings2, Leaf, WheatOff, Flame, Carrot } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  dietaryTags?: string[]; // e.g., ["vegan", "gluten-free", "spicy"]
  hasCustomizations?: boolean;
  onAddToCart?: (item: { id: string | number; name: string; price: number; customizations?: any }) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  dietaryTags = [],
  hasCustomizations = false,
  onAddToCart,
}) => {
  const { toast } = useToast();
  console.log('MenuItemCard loaded for:', name);

  const handleDirectAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ id, name, price });
    }
    toast({
      title: "Added to cart!",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleCustomizedAddToCart = () => {
    // In a real scenario, collect customization details here
    const customizations = { note: "User customized item" }; // Placeholder
    if (onAddToCart) {
      onAddToCart({ id, name, price, customizations });
    }
    toast({
      title: "Added to cart!",
      description: `${name} (customized) has been added to your cart.`,
    });
    // Potentially close the dialog here if not handled by Dialog primitive
  };

  const getDietaryIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'vegan':
        return <Leaf className="h-3 w-3 mr-1" />;
      case 'vegetarian':
        return <Carrot className="h-3 w-3 mr-1" />;
      case 'gluten-free':
        return <WheatOff className="h-3 w-3 mr-1" />;
      case 'spicy':
        return <Flame className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x225?text=Food+Image'}
            alt={name}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </CardHeader>

      <CardContent className="p-4 flex-grow space-y-2">
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        
        {dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1 mb-2">
            {dietaryTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs flex items-center">
                {getDietaryIcon(tag)}
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <p className="text-lg font-bold text-gray-800 mt-2">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 border-t">
        {hasCustomizations ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Settings2 className="mr-2 h-4 w-4" />
                Customize & Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Customize {name}</DialogTitle>
                <DialogDescription>
                  Make your selections for {name}. Click add to order when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 grid gap-4">
                {/* Placeholder for customization options */}
                <p className="text-sm text-gray-500">
                  Customization options (e.g., size, toppings, spice level) would appear here.
                  For now, this is a placeholder.
                </p>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleCustomizedAddToCart}>Add to Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button className="w-full" onClick={handleDirectAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;