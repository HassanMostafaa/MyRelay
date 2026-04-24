import React, { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className = "", variant = "secondary", children, ...props }, ref) => {
    const baseStyles =
      "hover:scale-104 active:scale-95 transition-all flex items-center justify-center gap-2 px-3 py-1.5";

    const variants: Record<ButtonVariant, string> = {
      secondary: "border border-border bg-transparent text-foreground",
      primary:
        "bg-primary text-primary-foreground border border-primary hover:opacity-90",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
