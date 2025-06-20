import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast"; // or from sonner if preferred

import { Trash2, PlusCircle, MinusCircle, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  restaurantName?: string; // Optional, but good for context
}

const DELIVERY_FEE = 5.00;
const TAX_RATE = 0.08; // 8%

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'item1',
      name: 'Margherita Pizza',
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60',
      price: 12.99,
      quantity: 1,
      restaurantName: "Luigi's Pizzeria",
    },
    {
      id: 'item2',
      name: 'Classic Burger',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60',
      price: 8.50,
      quantity: 2,
      restaurantName: "Burger Queen",
    },
    {
      id: 'item3',
      name: 'Coca-Cola Can',
      imageUrl: 'https://images.unsplash.com/photo-1554866585-CD94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29kYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60',
      price: 1.50,
      quantity: 4,
      restaurantName: "Burger Queen",
    }
  ]);

  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  const handleIncreaseQuantity = (itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({ title: "Item removed", description: "The item has been removed from your cart." });
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") { // Example promo code
      setDiscount(subtotal * 0.10); // 10% discount
      toast({ title: "Promo code applied!", description: "10% discount has been applied." });
    } else if (promoCode.toUpperCase() === "FREE5") {
        setDiscount(5.00); // $5 flat discount
        toast({ title: "Promo code applied!", description: "$5 discount has been applied." });
    } else {
      setDiscount(0);
      toast({ variant: "destructive", title: "Invalid Promo Code", description: "The promo code entered is not valid." });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes + DELIVERY_FEE - discount;

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout flow or open a payment modal
    // For this example, it will just show a toast and clear the cart
    console.log("Proceeding to checkout with items:", cartItems, "Total:", total.toFixed(2));
    toast({
      title: "Order Placed (Simulation)",
      description: `Your order for $${total.toFixed(2)} would be processed. Thank you!`,
    });
    // Potentially navigate to an order confirmation page or clear cart
    // setCartItems([]); 
    // setPromoCode("");
    // setDiscount(0);
    // navigate('/order-confirmation'); // if such page exists
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader />
      <ScrollArea className="flex-grow">
        <main className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your Shopping Cart</h1>
            {cartItems.length > 0 && (
                 <span className="text-lg text-muted-foreground dark:text-gray-400 mt-2 md:mt-0">
                    {cartItems.length} item{cartItems.length === 1 ? '' : 's'} in your cart
                </span>
            )}
          </div>
          

          {cartItems.length === 0 ? (
            <Card className="text-center py-12 shadow-lg">
              <CardContent className="flex flex-col items-center">
                <ShoppingBag className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200">Your cart is empty!</h2>
                <p className="text-muted-foreground mb-6 dark:text-gray-400">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild size="lg">
                  <Link to="/restaurant-listing">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Cart Items Section */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-700 dark:text-gray-200">Review Your Items</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="dark:border-gray-700">
                          <TableHead className="w-[40%] sm:w-[50%] text-gray-600 dark:text-gray-300">Product</TableHead>
                          <TableHead className="w-[20%] sm:w-[15%] text-center text-gray-600 dark:text-gray-300">Quantity</TableHead>
                          <TableHead className="w-[20%] sm:w-[15%] text-right text-gray-600 dark:text-gray-300">Unit Price</TableHead>
                          <TableHead className="w-[20%] sm:w-[15%] text-right text-gray-600 dark:text-gray-300">Total</TableHead>
                          <TableHead className="w-auto text-center text-gray-600 dark:text-gray-300">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map(item => (
                          <TableRow key={item.id} className="dark:border-gray-700">
                            <TableCell className="font-medium py-4">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.name} 
                                  className="w-16 h-16 object-cover rounded-md hidden sm:block"
                                />
                                <div>
                                  <p className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</p>
                                  {item.restaurantName && <p className="text-xs text-muted-foreground dark:text-gray-400">{item.restaurantName}</p>}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Button variant="ghost" size="icon" className="h-7 w-7 dark:hover:bg-gray-700" onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                                  <MinusCircle className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                                </Button>
                                <span className="text-sm font-medium w-6 text-center text-gray-700 dark:text-gray-200">{item.quantity}</span>
                                <Button variant="ghost" size="icon" className="h-7 w-7 dark:hover:bg-gray-700" onClick={() => handleIncreaseQuantity(item.id)}>
                                  <PlusCircle className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right py-4 text-gray-700 dark:text-gray-200">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right py-4 font-semibold text-gray-800 dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell className="text-center py-4">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 dark:hover:bg-gray-700" onClick={() => handleRemoveItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove item</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-lg dark:bg-gray-800"> {/* sticky-top for scrolling */}
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-700 dark:text-gray-200">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Delivery Fee</span>
                      <span>${DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Taxes ({(TAX_RATE * 100).toFixed(0)}%)</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                    
                    <Separator className="dark:bg-gray-700" />
                    
                    <div>
                      <Label htmlFor="promo-code" className="text-sm font-medium text-gray-700 dark:text-gray-200">Promo Code</Label>
                      <div className="flex items-center gap-2 mt-1">
                         <InputOTP 
                            maxLength={6} 
                            value={promoCode} 
                            onChange={(value) => setPromoCode(value)}
                            id="promo-code"
                          >
                          <InputOTPGroup className="flex-grow dark:[&>input]:bg-gray-700 dark:[&>input]:border-gray-600 dark:[&>input]:text-gray-100">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        <Button variant="outline" onClick={handleApplyPromoCode} className="whitespace-nowrap dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Apply</Button>
                      </div>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-semibold">
                        <span>Discount Applied</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <Separator className="dark:bg-gray-700"/>
                    
                    <div className="flex justify-between text-lg font-bold text-gray-800 dark:text-gray-100">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </main>
      </ScrollArea>
      <AppFooter />
    </div>
  );
};

export default CartPage;