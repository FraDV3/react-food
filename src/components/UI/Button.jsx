export default function Button({
  children,
  onClick,
  type,
  mode = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${mode} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
