export default function Input({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  error,
  ...props
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm text-gray-600 mb-1">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input w-full ${error ? "border-red-400" : ""} ${className}`}
        {...props}
      />

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}