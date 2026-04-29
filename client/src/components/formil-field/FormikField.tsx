import { cn } from "@/src/lib/utils";
import { Field, useField } from "formik";
import React, { ReactNode } from "react";

export const FormikField = ({
  type,
  name,
  placeholder,
  label,
  wrapperClassName,
  startIcon,
  endIcon,
}: {
  type: string;
  name: string;
  placeholder?: string;
  label?: string;
  wrapperClassName?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}) => {
  const [field, meta] = useField(name);

  const hasError = meta.touched && meta.error;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 items-start justify-start",
        wrapperClassName,
      )}
    >
      {label && (
        <label className="text-sm" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative w-full">
        {startIcon && (
          <div
            unselectable="on"
            className="absolute inset-s-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {startIcon}
          </div>
        )}

        <Field
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full border px-4 py-3 text-xs transition-colors",
            startIcon && "ps-9",
            endIcon && "pe-9",
            hasError
              ? "border-red-400 focus:ring-red-400"
              : "border-border focus:ring-primary",
          )}
        />

        {endIcon && (
          <div
            unselectable="on"
            className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {endIcon}
          </div>
        )}
      </div>

      {hasError && <div className="text-xs text-red-400">{meta.error}</div>}
    </div>
  );
};
