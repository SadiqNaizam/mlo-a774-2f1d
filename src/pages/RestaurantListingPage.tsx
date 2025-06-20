import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import RestaurantCard from '@/components/RestaurantCard';

// Shadcn/UI Components
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

// Lucide Icons
import { Search, Filter,SlidersHorizontal } from 'lucide-react';

const sampleRestaurants = [
  {
    id: '1',
    name: 'Bella Napoli Pizzeria',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.7,
    ratingCount: 250,
    deliveryTime: '25-35 min',
    promotionalTag: '15% OFF',
  },
  {
    id: '2',
    name: 'Tokyo Sushi House',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.9,
    ratingCount: 320,
    deliveryTime: '30-40 min',
  },
  {
    id: '3',
    name: 'The Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.3,
    ratingCount: 180,
    deliveryTime: '20-30 min',
    promotionalTag: 'Combo Deal',
  },
  {
    id: '4',
    name: 'Spicy Aroma Indian',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a05841785d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Indian', 'Curry', 'Biryani'],
    rating: 4.6,
    ratingCount: 210,
    deliveryTime: '35-45 min',
  },
  {
    id: '5',
    name: 'Green Leaf Vegan Cafe',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17021?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmVnYW4lMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Vegan', 'Healthy', 'Salads'],
    rating: 4.8,
    ratingCount: 150,
    deliveryTime: '25-35 min',
    promotionalTag: 'Organic',
  },
  {
    id: '6',
    name: 'Taco Fiesta Express',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-BA5d37144284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    cuisineTypes: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.4,
    ratingCount: 190,
    deliveryTime: '20-30 min',
  },
];

const filterOptions = [
  { id: 'open-now', label: 'Open Now' },
  { id: 'offers', label: 'Has Offers' },
  { id: 'free-delivery', label: 'Free Delivery' },
  { id: 'top-rated', label: 'Top Rated (4.5+)' },
];

const ITEMS_PER_PAGE = 6; // Number of restaurants per page

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Placeholder filtering logic - in a real app, this would filter `sampleRestaurants`
  const filteredRestaurants = sampleRestaurants; // Replace with actual filtered list

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const currentRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setActiveFilters(prev => ({ ...prev, [filterId]: checked }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader />
      <div className="flex-grow overflow-hidden"> {/* Container for scrollable area */}
        <ScrollArea className="h-full">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters and Search Section */}
            <Card className="mb-8 p-4 sm:p-6 shadow-lg bg-card">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <SlidersHorizontal className="mr-3 h-6 w-6 text-primary" />
                  Restaurants Near You
                </h1>
                 {/* Potentially add a quick "Cuisine Filter" dropdown here if needed */}
              </div>
             

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Search Input */}
                <div className="md:col-span-8 lg:col-span-9">
                  <Label htmlFor="search-restaurants" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Search Restaurants
                  </Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="search-restaurants"
                      type="search"
                      placeholder="Search by name, cuisine, or dish..."
                      className="pl-10 pr-4 py-2 w-full"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                      }}
                    />
                  </div>
                </div>

                {/* Sort Select */}
                <div className="md:col-span-4 lg:col-span-3">
                  <Label htmlFor="sort-by" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort By
                  </Label>
                  <Select value={sortBy} onValueChange={(value) => {
                      setSortBy(value);
                      setCurrentPage(1); // Reset to first page on sort change
                    }}>
                    <SelectTrigger id="sort-by" className="w-full mt-1">
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Relevance</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                      <SelectItem value="delivery-time">Delivery Time (Fastest)</SelectItem>
                      <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                      <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Checkbox Filters */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filter Options
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {filterOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={!!activeFilters[option.id]}
                        onCheckedChange={(checked) => handleFilterChange(option.id, !!checked)}
                      />
                      <Label htmlFor={option.id} className="text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Restaurant Listing Section */}
            {currentRestaurants.length > 0 ? (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentRestaurants.map(restaurant => (
                    <RestaurantCard
                      key={restaurant.id}
                      id={restaurant.id}
                      name={restaurant.name}
                      imageUrl={restaurant.imageUrl}
                      cuisineTypes={restaurant.cuisineTypes}
                      rating={restaurant.rating}
                      ratingCount={restaurant.ratingCount}
                      deliveryTime={restaurant.deliveryTime}
                      promotionalTag={restaurant.promotionalTag}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-200">No Restaurants Found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}

            {/* Pagination Section */}
            {totalPages > 1 && (
              <section className="mt-12 flex justify-center pb-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => {
                       const pageNum = i + 1;
                       // Basic logic to show ellipsis for many pages - simplified for this example
                       if (totalPages <= 5 || pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1) {
                         return (
                           <PaginationItem key={i}>
                             <PaginationLink
                               href="#"
                               onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                               isActive={currentPage === pageNum}
                             >
                               {pageNum}
                             </PaginationLink>
                           </PaginationItem>
                         );
                       } else if (Math.abs(pageNum - currentPage) === 2 && (pageNum < currentPage || pageNum > currentPage) ) {
                           // Show ellipsis if there's a gap of 2 or more, but only once.
                           // This simplified logic might show ellipsis twice sometimes.
                           // A more robust pagination display logic is needed for complex cases.
                           if ((pageNum === 2 && currentPage > 3) || (pageNum === totalPages - 1 && currentPage < totalPages - 2)) {
                             return <PaginationEllipsis key={`ellipsis-${pageNum}`} />;
                           }
                       }
                       return null;
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </section>
            )}
          </main>
        </ScrollArea>
      </div>
      <AppFooter />
    </div>
  );
};

export default RestaurantListingPage;