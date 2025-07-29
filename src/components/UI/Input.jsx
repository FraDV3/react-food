// This is a reusable Input component that can be customized using props.
// It receives a `label`, `id`, and any additional props via the rest operator (...props).

export default function Input({ label, id, ...props }) {
  return (
    // Wraps the label and input in a paragraph for layout styling.
    <p className="control">
      {/* The label is linked to the input using htmlFor and id for accessibility. */}
      <label htmlFor={id}>{label}</label>

      {/* The input gets its id and name from props and supports all other standard attributes. */}
      {/* 'required' is added by default to enforce validation. */}
      <input id={id} name={id} required {...props} />
    </p>
  );
}
