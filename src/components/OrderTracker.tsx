import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Define the structure for each step in the tracker
interface IndividualStep {
  id: string; // Unique identifier for the step (e.g., "order-placed")
  label: string; // Display name for the step (e.g., "Order Placed")
  icon: React.ElementType; // Icon component from lucide-react (e.g., ClipboardList)
  time?: string; // Optional: Time associated with this step (e.g., "10:30 AM" or "Est. 15 mins")
}

// Props for the OrderTracker component
interface OrderTrackerProps {
  steps: IndividualStep[]; // Array of all possible steps defining the order journey
  currentStepId: string; // The ID of the currently active step
  orderNumber?: string; // Optional: To display the order number
  overallEstimatedDelivery?: string; // Optional: To display the overall estimated delivery time
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
  steps,
  currentStepId,
  orderNumber,
  overallEstimatedDelivery,
}) => {
  console.log('OrderTracker loaded. Current step ID:', currentStepId);

  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  const getStepStatus = (index: number): 'completed' | 'current' | 'pending' => {
    if (currentStepIndex === -1 && steps.length > 0) return 'pending'; // If currentStepId is not found, all are pending
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'pending';
  };

  let progressPercentage = 0;
  if (steps.length > 1 && currentStepIndex >= 0) {
    progressPercentage = (currentStepIndex / (steps.length - 1)) * 100;
    if (currentStepIndex === steps.length - 1) { // If current step is the last one
        progressPercentage = 100;
    }
  } else if (steps.length === 1 && currentStepIndex === 0) {
    // For a single step, if it's current, conceptually it's 100% "done" for its node.
    // The line itself isn't relevant here or has 0 length.
    progressPercentage = 100; 
  }

  const isOrderDelivered = currentStepIndex === steps.length - 1 && steps.length > 0 && currentStepIndex !== -1;

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-lg">
      <CardHeader className="pb-4 text-center sm:text-left">
        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Order Status</CardTitle>
        {orderNumber && (
          <CardDescription className="text-sm text-gray-600">
            Order #{orderNumber}
          </CardDescription>
        )}
        {overallEstimatedDelivery && !isOrderDelivered && (
          <p className="text-md sm:text-lg text-green-600 font-medium pt-1">
            Estimated Delivery: {overallEstimatedDelivery}
          </p>
        )}
      </CardHeader>
      <CardContent className="pt-8 pb-10 px-2 sm:px-6">
        {steps.length === 0 ? (
          <p className="text-center text-gray-500">Order status information is not available.</p>
        ) : (
          <div className="relative">
            {/* Background Line: Spans between centers of first and last icons. Visible if more than one step. */}
            {/* Icon width w-10 is 2.5rem. Half of this is 1.25rem. Line is inset by this amount on each side. */}
            {steps.length > 1 && (
              <div className="absolute top-5 left-[1.25rem] right-[1.25rem] h-[3px] bg-gray-200 -z-10 rounded-full" />
            )}
            {/* Active Progress Line: Similar to background, but width controlled by progressPercentage. */}
            {steps.length > 1 && currentStepIndex >= 0 && (
              <div
                className="absolute top-5 left-[1.25rem] h-[3px] bg-green-500 -z-10 rounded-full"
                style={{
                  // Calculate width of active line: progressPercentage of (total line width available)
                  // Total available line width is (100% of parent - 2.5rem for both icon half-widths)
                  width: `calc((${progressPercentage}/100) * (100% - 2.5rem))`
                }}
              />
            )}

            <div className="flex items-start justify-between">
              {steps.map((step, index) => {
                const status = getStepStatus(index);
                const StepIconComponent = step.icon;

                return (
                  <div key={step.id} className="flex flex-col items-center text-center relative px-1">
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 bg-card", // bg-card to hide line segment directly under the icon
                        {
                          "border-green-500": status === 'completed',
                          "border-blue-500 scale-110 shadow-lg": status === 'current',
                          "border-gray-300": status === 'pending',
                        }
                      )}
                    >
                      <StepIconComponent
                        className={cn("w-5 h-5", {
                          "text-green-500": status === 'completed',
                          "text-blue-500": status === 'current',
                          "text-gray-400": status === 'pending',
                        })}
                      />
                      {status === 'current' && (
                        <span className="absolute flex h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                      )}
                    </div>
                    <p
                      className={cn("text-xs sm:text-sm font-medium break-words leading-tight max-w-[60px] sm:max-w-[80px]", {
                        "text-green-700": status === 'completed',
                        "text-blue-700 font-semibold": status === 'current',
                        "text-gray-600": status === 'pending',
                      })}
                    >
                      {step.label}
                    </p>
                    {step.time && (
                      <p
                        className={cn("text-xs mt-1 text-gray-500", {
                          "font-semibold text-blue-600": status === 'current',
                        })}
                      >
                        {step.time}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            {isOrderDelivered && (
              <p className="text-center text-green-600 mt-8 font-semibold text-lg animate-pulse">
                Your order has been delivered!
              </p>
            )}
             {currentStepIndex === -1 && steps.length > 0 && (
                <p className="text-center text-orange-600 mt-8 font-medium text-sm">
                    Order status is currently being updated. Please check back shortly.
                </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTracker;