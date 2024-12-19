import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode;
}

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, href, children, ...props }, ref) => {
    if (href) {
      return (
        <Link
          ref={ref}
          to={href}
          className={cn(
            "hover:text-primary transition-colors",
            className
          )}
          {...props}
        >
          {children}
        </Link>
      );
    }

    return (
      <span
        className={cn("text-gray-900 font-medium", className)}
        {...(props as any)}
      >
        {children}
      </span>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ className, separator = "/", children, ...props }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn("flex items-center text-sm text-gray-500", className)}
        {...props}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">{separator}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

// Create a compound component type
type BreadcrumbComponent = React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLDivElement>> & {
  Item: typeof BreadcrumbItem;
};

// Cast the Breadcrumb component to include the Item property
const BreadcrumbWithItem = Breadcrumb as BreadcrumbComponent;
BreadcrumbWithItem.Item = BreadcrumbItem;

export { BreadcrumbWithItem as Breadcrumb, type BreadcrumbProps, type BreadcrumbItemProps };