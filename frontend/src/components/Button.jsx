import React from "react";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  // legacy props (no-op, kept to avoid React warnings when still passed)
  bgColor, // eslint-disable-line no-unused-vars
  textColor, // eslint-disable-line no-unused-vars
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  const variantClasses = {
    primary: "bg-(--brand) text-white hover:bg-(--brand-strong)",
    secondary:
      "border border-(--line) bg-(--surface) text-white hover:bg-(--surface-strong)",
    ghost: "text-white hover:bg-(--surface-strong)",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
