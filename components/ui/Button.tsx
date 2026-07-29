import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "solid" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: "bg-ink text-cream hover:bg-coral",
  outline: "border border-ink text-ink hover:border-coral hover:text-coral",
};

export function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
