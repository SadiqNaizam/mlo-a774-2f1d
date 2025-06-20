import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  ratingCount?: number;
  deliveryTime: string; // e.g., "25-35 min"
  promotionalTag?: string; // e.g., "20% OFF"
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  ratingCount,
  deliveryTime,
  promotionalTag,
  className,
}) => {
  console.log(`RestaurantCard loaded for: ${name}`);

  return (
    <Link to={`/restaurant-menu?id=${id}`} className={`block group ${className}`}>
      <Card className="w-full overflow-hidden h-full flex flex-col transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {promotionalTag && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 z-10 text-xs px-2 py-1"
            >
              {promotionalTag}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between space-y-2">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {cuisineTypes.join(', ')}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground pt-2 border-t border-dashed mt-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
              {ratingCount && <span className="ml-1">({ratingCount})</span>}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-600" />
              <span className="text-gray-700">{deliveryTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;