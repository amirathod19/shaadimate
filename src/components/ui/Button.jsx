export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-medium transition";

  const variants = {
    primary: "bg-[#e7bfa7] text-white hover:opacity-90",
    secondary: "bg-gray-100 text-gray-700",
    danger: "bg-red-100 text-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}