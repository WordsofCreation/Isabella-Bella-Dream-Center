"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-card hover:bg-muted",
  ghost: "hover:bg-muted",
  accent: "bg-accent text-accent-foreground hover:bg-accent/85",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-6",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

function getTextLabel(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextLabel).join(" ").replace(/\s+/g, " ").trim();
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextLabel(node.props.children);
  }

  return "Workspace action";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      type = "button",
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      onClick?.(event);

      if (event.defaultPrevented || type === "submit" || onClick) {
        return;
      }

      window.dispatchEvent(
        new CustomEvent("ibdc:workspace-action", {
          detail: {
            label: props["aria-label"] ?? getTextLabel(children),
          },
        }),
      );
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        type={type}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
