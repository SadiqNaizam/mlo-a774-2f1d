import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import OrderTracker from '@/components/OrderTracker';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, MapPin, CreditCard, History, Settings, ClipboardList, Package, Truck, CheckCircle2, Home, PlusCircle, Trash2, Edit3 } from 'lucide-react';

// Schema for profile form validation
const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal("")),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false; // If new password is set, current password must also be set
    }
    return true;
}, {
    message: "Current password is required to set a new password.",
    path: ["currentPassword"],
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Sample data
const sampleAddresses = [
  { id: '1', type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210', isDefault: true },
  { id: '2', type: 'Work', line1: '456 Business Rd', city: 'Busytown', state: 'NY', zip: '10001', isDefault: false },
];

const samplePaymentMethods = [
  { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: '2', type: 'MasterCard', last4: '5555', expiry: '06/26', isDefault: false },
];

const sampleOrderHistory = [
  { 
    id: 'ORD12345', 
    date: '2024-07-15', 
    total: 45.99, 
    status: 'Delivered', 
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 15.99 },
      { name: 'Coke', quantity: 4, price: 2.00 },
    ],
    restaurant: 'Pizza Place',
  },
  { 
    id: 'ORD67890', 
    date: '2024-07-20', 
    total: 22.50, 
    status: 'Processing', 
    items: [
      { name: 'Chicken Burger', quantity: 1, price: 12.50 },
      { name: 'Fries', quantity: 1, price: 4.00 },
      { name: 'Sprite', quantity: 1, price: 2.00 },
    ],
    restaurant: 'Burger Joint',
  },
];

// Order Tracker steps definition
const orderTrackerSteps = [
  { id: "order-placed", label: "Order Placed", icon: ClipboardList },
  { id: "processing", label: "Processing", icon: Package },
  { id: "out-for-delivery", label: "Out for Delivery", icon: Truck },
  { id: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "John Doe", // Placeholder
      email: "john.doe@example.com", // Placeholder
      phone: "123-456-7890", // Placeholder
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log("Profile submitted:", data);
    // Call API to update profile
    // Show toast notification on success/error
  }

  const activeOrder = sampleOrderHistory.find(order => order.status === 'Processing' || order.status === 'Out for Delivery');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppHeader />
      <ScrollArea className="flex-1">
        <main className="container mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">My Account</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
              <TabsTrigger value="profile" className="text-xs sm:text-sm">
                <User className="w-4 h-4 mr-1 sm:mr-2" /> My Profile
              </TabsTrigger>
              <TabsTrigger value="addresses" className="text-xs sm:text-sm">
                <MapPin className="w-4 h-4 mr-1 sm:mr-2" /> Delivery Addresses
              </TabsTrigger>
              <TabsTrigger value="payments" className="text-xs sm:text-sm">
                <CreditCard className="w-4 h-4 mr-1 sm:mr-2" /> Payment Methods
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs sm:text-sm">
                <History className="w-4 h-4 mr-1 sm:mr-2" /> Order History
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm">
                <Settings className="w-4 h-4 mr-1 sm:mr-2" /> Settings
              </TabsTrigger>
            </TabsList>

            {/* My Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and manage your password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <h3 className="text-lg font-medium pt-4 border-t mt-6">Change Password</h3>
                       <FormField
                        control={profileForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter current password" {...field} />
                            </FormControl>
                            <FormDescription>Required if changing password.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={profileForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter new password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={profileForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm new password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Delivery Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Addresses</CardTitle>
                  <CardDescription>Manage your saved delivery locations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sampleAddresses.map(address => (
                    <Card key={address.id} className="p-4 flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <Home className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                          <span className="font-semibold">{address.type}</span>
                          {address.isDefault && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{address.line1}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{address.city}, {address.state} {address.zip}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm"><Edit3 className="w-4 h-4 mr-1"/> Edit</Button>
                        <Button variant="destructive" size="sm" disabled={address.isDefault}><Trash2 className="w-4 h-4 mr-1"/> Delete</Button>
                      </div>
                    </Card>
                  ))}
                   <Button className="mt-4">
                    <PlusCircle className="w-4 h-4 mr-2" /> Add New Address
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {samplePaymentMethods.map(method => (
                    <Card key={method.id} className="p-4 flex justify-between items-start">
                       <div>
                        <div className="flex items-center mb-1">
                          <CreditCard className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                          <span className="font-semibold">{method.type} ending in {method.last4}</span>
                           {method.isDefault && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Expires: {method.expiry}</p>
                      </div>
                      <div className="flex space-x-2">
                         <Button variant="outline" size="sm"><Edit3 className="w-4 h-4 mr-1"/> Edit</Button>
                        <Button variant="destructive" size="sm" disabled={method.isDefault}><Trash2 className="w-4 h-4 mr-1"/> Delete</Button>
                      </div>
                    </Card>
                  ))}
                  <Button className="mt-4">
                    <PlusCircle className="w-4 h-4 mr-2" /> Add New Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Order History Tab */}
            <TabsContent value="orders">
              {activeOrder && (
                <div className="mb-8">
                  <OrderTracker
                    steps={orderTrackerSteps}
                    currentStepId={
                        activeOrder.status === 'Processing' ? 'processing' :
                        activeOrder.status === 'Out for Delivery' ? 'out-for-delivery' :
                        'order-placed' // Default to placed if status mapping is incomplete
                    }
                    orderNumber={activeOrder.id}
                    overallEstimatedDelivery="Est. 30-45 mins" // Placeholder
                  />
                </div>
              )}
              <Card>
                <CardHeader>
                  <CardTitle>Past Orders</CardTitle>
                  <CardDescription>Review your previous orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  {sampleOrderHistory.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {sampleOrderHistory.map(order => (
                        <AccordionItem value={order.id} key={order.id}>
                          <AccordionTrigger>
                            <div className="flex justify-between w-full pr-4">
                              <span>Order #{order.id} ({order.restaurant})</span>
                              <span>{order.date} - ${order.total.toFixed(2)} - <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {order.items.map(item => (
                                <li key={item.name}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                              ))}
                            </ul>
                            <div className="mt-4 flex space-x-2">
                                <Button variant="outline" size="sm">View Receipt</Button>
                                {order.status === 'Delivered' && <Button variant="secondary" size="sm">Reorder</Button>}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">You have no past orders.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your notification preferences and account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-md font-medium mb-2">Notification Preferences</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <Input type="checkbox" defaultChecked />
                                <span>Email notifications for order updates</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Input type="checkbox" />
                                <span>SMS notifications for delivery alerts</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Input type="checkbox" defaultChecked />
                                <span>Promotional emails</span>
                            </label>
                        </div>
                    </div>
                    <div className="border-t pt-6">
                         <h3 className="text-md font-medium mb-2">Account Management</h3>
                         <Button variant="outline">Request Account Data</Button>
                         <Button variant="destructive" className="ml-2">Delete Account</Button>
                         <p className="text-xs text-muted-foreground mt-2">Account deletion is permanent and cannot be undone.</p>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </ScrollArea>
      <AppFooter />
    </div>
  );
};

export default UserProfilePage;