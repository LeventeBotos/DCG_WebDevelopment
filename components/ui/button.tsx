import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen text-white shadow-lg hover:shadow-xl",
        secondary:
          "border hover:border-dcg-lightGreen/50  hover:text-dcg-lightGreen shadow-sm hover:shadow-lg ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      showArrow,
      children,
      ...props
    },
    ref
  ) => {
    const shouldShowArrow =
      showArrow ?? (variant === "primary" && size !== "icon");
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild && React.isValidElement(children)) {
      const childElement = children as React.ReactElement<
        Record<string, unknown>
      >;
      const childProps = childElement.props as {
        children?: React.ReactNode;
        className?: string;
      };
      const existingChildContent = childProps.children || childElement;

      const mergedChildren = (
        <>
          {existingChildContent}
          {shouldShowArrow ? (
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          ) : null}
        </>
      );

      return React.cloneElement(
        childElement,
        {
          ...props,
          className: cn(classes, childProps.className),
          ref,
        },
        mergedChildren
      );
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
        {shouldShowArrow ? (
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        ) : null}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
