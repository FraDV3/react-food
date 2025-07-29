// Error component: displays an error message with a title and descriptive text
export default function Error({title, message}) {
  // JSX returned represents a styled error box
  return (
    <div className="error">
      {/* The title of the error, passed as a prop */}
      <h2>{title}</h2>
      {/* The error message, passed as a prop */}
      <p>{message}</p>
    </div>
  );
}
