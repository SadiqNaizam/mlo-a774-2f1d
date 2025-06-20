import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import CuisineCategoryChip from '@/components/CuisineCategoryChip';
import RestaurantCard from '@/components/RestaurantCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

// Placeholder Data
const sampleCuisines = [
  { label: "Italian", value: "italian", imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXRhbGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60" },
  { label: "Mexican", value: "mexican", imageUrl: "https://images.unsplash.com/photo-1565299585323-BA4d69068976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWV4aWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60" },
  { label: "Chinese", value: "chinese", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60" },
  { label: "Indian", value: "indian", imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60" },
  { label: "Burgers", value: "burgers", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60" },
  { label: "Sushi", value: "sushi", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60" },
];

const sampleRestaurants = [
  {
    id: "1",
    name: "Bella Italia Trattoria",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    cuisineTypes: ["Italian", "Pizza"],
    rating: 4.5,
    ratingCount: 210,
    deliveryTime: "30-40 min",
    promotionalTag: "15% OFF",
  },
  {
    id: "2",
    name: "Taco Fiesta Express",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    cuisineTypes: ["Mexican", "Tacos"],
    rating: 4.2,
    ratingCount: 180,
    deliveryTime: "25-35 min",
  },
  {
    id: "3",
    name: "The Wok Spot",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    cuisineTypes: ["Chinese", "Noodles"],
    rating: 4.7,
    ratingCount: 320,
    deliveryTime: "35-45 min",
    promotionalTag: "Free Delivery",
  },
  {
    id: "4",
    name: "Curry Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    cuisineTypes: ["Indian", "Curry"],
    rating: 4.6,
    ratingCount: 250,
    deliveryTime: "40-50 min",
  },
];

const Homepage = () => {
  console.log('Homepage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/restaurant-listing?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCuisineChipClick = (cuisineValue: string) => {
    navigate(`/restaurant-listing?cuisine=${cuisineValue}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />

      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section with Search */}
          <section className="text-center py-12 md:py-16 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white mb-12 shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Discover Your Next Meal</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
              Explore top-rated restaurants and delicious cuisines near you. Fast delivery, easy ordering.
            </p>
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative px-4">
              <Input
                type="search"
                placeholder="Search restaurants, cuisines, dishes..."
                className="w-full p-4 pl-12 pr-14 text-md sm:text-lg rounded-full shadow-md text-gray-900 focus:ring-2 focus:ring-orange-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search for food"
              />
              <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button type="submit" size="icon" className="absolute right-6 top-1/2 transform -translate-y-1/2 rounded-full bg-orange-600 hover:bg-orange-700 w-10 h-10">
                <Search className="h-5 w-5 text-white" />
                 <span className="sr-only">Search</span>
              </Button>
            </form>
          </section>

          {/* Cuisine Categories */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Browse by Cuisine</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {sampleCuisines.map(cuisine => (
                <CuisineCategoryChip
                  key={cuisine.value}
                  label={cuisine.label}
                  value={cuisine.value}
                  isSelected={false} // No persistent selection state on homepage for navigation
                  onClick={handleCuisineChipClick}
                  className="w-full" // Ensure chips take full width of their grid cell
                />
              ))}
            </div>
          </section>

          {/* Featured Restaurants */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Featured Restaurants</h2>
              <Button variant="outline" asChild>
                <Link to="/restaurant-listing">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
           <section className="text-center py-10 bg-slate-100 rounded-lg shadow">
             <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">Ready to Order?</h2>
             <p className="text-gray-600 mb-6 max-w-lg mx-auto">Find the best food experience with FoodieFiesta. Hundreds of restaurants at your fingertips.</p>
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3" asChild>
                <Link to="/restaurant-listing">
                    Explore All Restaurants
                </Link>
             </Button>
          </section>

        </main>
      </ScrollArea>
      <AppFooter />
    </div>
  );
};

export default Homepage;