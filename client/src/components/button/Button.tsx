import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link, { LinkProps } from "next/link";

type ButtonVariant = "primary" | "secondary" | "danger";

type BaseProps = {
  className?: string;
  variant?: ButtonVariant;
  children?: React.ReactNode;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkButtonProps = BaseProps &
  LinkProps & {
    href: string;
  };

type IButtonProps = ButtonProps | LinkButtonProps;

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className = "", variant = "secondary", children, ...props }, ref) => {
    const baseStyles =
      "hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 px-4 py-1.5  disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<ButtonVariant, string> = {
      secondary: "border border-border bg-transparent text-foreground",
      primary:
        "bg-primary text-primary-foreground border border-primary hover:opacity-90",
      danger:
        "border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/16",
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    // 👉 If href exists → render Link
    if ("href" in props && props.href) {
      return (
        <Link href={props.href} className={classes}>
          {children}
        </Link>
      );
    }

    // 👉 Otherwise → render button
    return (
      <button
        ref={ref}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
