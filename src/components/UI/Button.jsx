/**
 * A reusable Button component that supports various styles and behaviors.
 * 
 * Props:
 * - children: The content to be displayed inside the button (text, icons, etc.)
 * - onClick: Function to be executed when the button is clicked
 * - type: The button's type attribute (e.g. "button", "submit", "reset")
 * - mode: Optional string to define visual style class (default is "button")
 * - className: Optional extra CSS classes to apply
 * - ...props: Any other valid button props (e.g. disabled, aria-label)
 */
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
      type={type} // HTML button type
      onClick={onClick} // Click handler
      className={`${mode} ${className}`.trim()} // Combine mode and extra classes
      {...props} // Spread other props like disabled or aria-label
    >
      {children} {/* Render any nested content inside the button */}
    </button>
  );
}
