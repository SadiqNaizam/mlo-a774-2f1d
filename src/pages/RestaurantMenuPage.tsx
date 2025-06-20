import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import MenuItemCard from '@/components/MenuItemCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button"; // For any general buttons if needed
import { Star, Clock, ShoppingCart, Utensils } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  dietaryTags?: string[];
  hasCustomizations?: boolean;
}

interface MenuCategory {
  [categoryKey: string]: MenuItem[];
}

interface Restaurant {
  id: string;
  name: string;
  bannerUrl: string;
  logoUrl: string;
  cuisineTypes: string[];
  rating: number;
  ratingCount: string;
  deliveryTime: string;
  isOpen: boolean;
  menu: MenuCategory;
}

// Placeholder data for restaurants
const restaurantsData: { [key: string]: Restaurant } = {
  'default': {
    id: 'default',
    name: "Mama Mia's Pizzeria",
    bannerUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80",
    logoUrl: "https://via.placeholder.com/100?text=MM",
    cuisineTypes: ["Italian", "Pizza", "Pasta"],
    rating: 4.7,
    ratingCount: "350+",
    deliveryTime: "30-40 min",
    isOpen: true,
    menu: {
      appetizers: [
        { id: "app1", name: "Garlic Bread", description: "Crusty bread with garlic butter and herbs.", price: 6.99, imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: ["vegetarian"], hasCustomizations: false },
        { id: "app2", name: "Bruschetta", description: "Grilled bread rubbed with garlic and topped with tomato, basil, and olive oil.", price: 8.50, imageUrl: "https://images.unsplash.com/photo-1505253716362-af242227bc07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: ["vegan", "vegetarian"], hasCustomizations: false },
      ],
      pizzas: [
        { id: "piz1", name: "Margherita Pizza", description: "Classic delight with 100% real mozzarella cheese. Customizable toppings available.", price: 12.99, imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: ["vegetarian"], hasCustomizations: true },
        { id: "piz2", name: "Pepperoni Pizza", description: "A classic pepperoni pizza with a rich tomato sauce and spicy pepperoni.", price: 14.50, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: ["spicy"], hasCustomizations: true },
      ],
      pastas: [
        { id: "pas1", name: "Spaghetti Carbonara", description: "Creamy pasta with pancetta, egg, and Parmesan cheese.", price: 15.00, imageUrl: "https://images.unsplash.com/photo-1588013273468-31508b966710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: [], hasCustomizations: true },
      ],
      desserts: [
         { id: "des1", name: "Tiramisu", description: "Classic Italian dessert with coffee, mascarpone, and cocoa.", price: 7.50, imageUrl: "https://images.unsplash.com/photo-1571624531500-d366800a1017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: ["vegetarian"], hasCustomizations: false },
      ],
      drinks: [
        { id: "drk1", name: "Cola", description: "Refreshing classic cola.", price: 2.50, imageUrl: "https://images.unsplash.com/photo-1554866585-CD94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", hasCustomizations: false },
      ]
    },
  },
  'sushi-spot': {
    id: 'sushi-spot',
    name: "Sushi Spot Deluxe",
    bannerUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80",
    logoUrl: "https://via.placeholder.com/100?text=SS",
    cuisineTypes: ["Japanese", "Sushi", "Asian"],
    rating: 4.9,
    ratingCount: "500+",
    deliveryTime: "20-30 min",
    isOpen: true,
    menu: {
        sushiRolls: [
            { id: "sush1", name: "Salmon Nigiri", description: "Fresh salmon over sushi rice.", price: 5.00, imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", hasCustomizations: false },
            { id: "sush2", name: "California Roll", description: "Crab, avocado, and cucumber rolled in seaweed and rice.", price: 8.50, imageUrl: "https://images.unsplash.com/photo-1617196034183-421b491709db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: [], hasCustomizations: true },
        ],
        appetizers: [
            { id: "appSushi1", name: "Edamame", description: "Steamed soybeans with sea salt.", price: 4.00, imageUrl: "https://images.unsplash.com/photo-1596597014338-c450369535fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=225&q=80", dietaryTags: ["vegan", "gluten-free"], hasCustomizations: false },
        ]
    }
  }
};

const RestaurantMenuPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast(); // For potential page-level toasts if MenuItemCard's isn't sufficient
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    console.log('RestaurantMenuPage loaded');
    const restaurantId = searchParams.get('id');
    if (restaurantId && restaurantsData[restaurantId]) {
      setRestaurant(restaurantsData[restaurantId]);
    } else {
      setRestaurant(restaurantsData['default']); // Fallback to default
    }
    // In a real app, you would fetch restaurant data based on ID here
    // fetch(`/api/restaurants/${restaurantId}`).then(res => res.json()).then(data => setRestaurant(data));
  }, [searchParams]);

  const handleAddToCart = (item: { id: string | number; name: string; price: number; customizations?: any }) => {
    console.log("Adding to cart (from page):", item);
    // MenuItemCard handles its own toast, but if there were other cart interactions:
    // toast({
    //   title: `${item.name} added to cart!`,
    //   description: item.customizations ? "With your custom choices." : "Enjoy your meal!",
    // });
    // Actual cart logic (e.g., updating context/state) would go here
  };

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Loading restaurant details...</p>
        </div>
        <AppFooter />
      </div>
    );
  }

  const menuCategories = Object.keys(restaurant.menu);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <ScrollArea className="flex-1">
        <header className="relative">
          <img
            src={restaurant.bannerUrl}
            alt={`${restaurant.name} banner`}
            className="w-full h-48 md:h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text visibility if needed */}
        </header>

        <main className="container mx-auto py-8 px-4 md:px-6 -mt-16 md:-mt-20 relative z-10">
          <section className="bg-card p-6 rounded-xl shadow-xl mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage src={restaurant.logoUrl} alt={`${restaurant.name} logo`} />
                <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center"><Utensils className="w-4 h-4 mr-1" /> {restaurant.cuisineTypes.join(', ')}</span>
                  <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" /> {restaurant.rating} ({restaurant.ratingCount} ratings)</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {restaurant.deliveryTime}</span>
                </div>
              </div>
              <Badge variant={restaurant.isOpen ? "default" : "destructive"} className={restaurant.isOpen ? "bg-green-500 hover:bg-green-600" : ""}>
                {restaurant.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/restaurant-listing">Restaurants</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{restaurant.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </section>

          <section>
            <Tabs defaultValue={menuCategories[0] || "menu"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:justify-start lg:w-auto mb-6 bg-card p-1 rounded-lg shadow-sm overflow-x-auto">
                {menuCategories.map((categoryKey) => (
                  <TabsTrigger key={categoryKey} value={categoryKey} className="capitalize whitespace-nowrap">
                    {categoryKey.replace(/([A-Z])/g, ' $1').trim()} 
                  </TabsTrigger>
                ))}
                 {menuCategories.length === 0 && <TabsTrigger value="menu" disabled>Menu</TabsTrigger>}
              </TabsList>

              {menuCategories.map((categoryKey) => (
                <TabsContent key={categoryKey} value={categoryKey}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {restaurant.menu[categoryKey].map((item) => (
                      <MenuItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        dietaryTags={item.dietaryTags}
                        hasCustomizations={item.hasCustomizations}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
              {menuCategories.length === 0 && (
                 <TabsContent value="menu">
                    <p className="text-center text-muted-foreground py-8">This restaurant currently has no items on its menu.</p>
                 </TabsContent>
              )}
            </Tabs>
          </section>
        </main>
      </ScrollArea>
      <AppFooter />
    </div>
  );
};

export default RestaurantMenuPage;