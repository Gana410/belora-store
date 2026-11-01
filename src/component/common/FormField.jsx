import { useId } from "react";

/** Label + control + inline error. `as` can be "input" | "textarea" | "select". */
export default function FormField({ label, error, as: Tag = "input", children, className = "", ...props }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`field ${error ? "has-error" : ""} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <Tag id={id} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props}>
        {children}
      </Tag>
      {error && (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
