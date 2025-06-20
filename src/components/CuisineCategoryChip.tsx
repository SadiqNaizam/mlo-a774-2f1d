import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface CuisineCategoryChipProps {
  /** The display text for the chip (e.g., "Italian", "Fast Food") */
  label: string;
  /** The underlying value for filtering (e.g., "italian", "fast_food") */
  value: string;
  /** Whether the chip is currently selected */
  isSelected: boolean;
  /** Callback function when the chip is clicked, passing its value */
  onClick: (value: string) => void;
  /** Optional additional class names for custom styling */
  className?: string;
}

const CuisineCategoryChip: React.FC<CuisineCategoryChipProps> = ({
  label,
  value,
  isSelected,
  onClick,
  className,
}) => {
  console.log(`CuisineCategoryChip loaded for: ${label}, selected: ${isSelected}`);

  const handleClick = () => {
    onClick(value);
  };

  return (
    <Toggle
      pressed={isSelected}
      onPressedChange={handleClick}
      aria-label={`Filter by ${label}`}
      className={cn(
        "h-auto px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isSelected
          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm",
        "border border-transparent", // Base border
        isSelected ? "border-primary/50" : "border-gray-300 dark:border-gray-700", // Conditional border for better visual distinction
        className
      )}
      data-testid={`cuisine-chip-${value}`}
    >
      {label}
    </Toggle>
  );
};

export default CuisineCategoryChip;