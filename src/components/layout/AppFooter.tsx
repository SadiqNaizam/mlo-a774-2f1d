import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Facebook, Twitter, Instagram } from 'lucide-react';

const AppFooter: React.FC = () => {
  console.log('AppFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t">
      <div className="container py-8 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">FoodieFiesta</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your favorite food, delivered fast.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact-support" className="text-muted-foreground hover:text-primary transition-colors">
                Contact Support
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Legal</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/terms-and-conditions" className="text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} FoodieFiesta. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;