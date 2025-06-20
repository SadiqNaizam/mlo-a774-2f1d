import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, MapPin, Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AppHeader: React.FC = () => {
  console.log('AppHeader loaded');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const cartItemCount = 0; // Placeholder, replace with actual cart item count from state/context

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const commonNavLinks = (
    <>
      <NavLink to="/" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/restaurant-listing" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
        Restaurants
      </NavLink>
      {/* Add other main navigation links here if needed */}
    </>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">FoodieFiesta</span>
          </Link>
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>New York, NY</span> {/* Placeholder location */}
          </Button>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search restaurants or dishes..."
              className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-4">
            {commonNavLinks}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Open Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user-profile" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                <div className="p-6">
                  <Link to="/" className="flex items-center gap-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">FoodieFiesta</span>
                  </Link>
                  <div className="relative mb-6 w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm"
                    />
                  </div>
                  <nav className="flex flex-col gap-4">
                    {commonNavLinks}
                     <Button variant="outline" size="sm" className="flex items-center gap-1 text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                        <MapPin className="h-4 w-4" />
                        <span>New York, NY</span>
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;