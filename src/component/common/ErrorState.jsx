import { FiAlertCircle } from "react-icons/fi";

export default function ErrorState({ error, onRetry, title = "Something went wrong" }) {
  return (
    <div className="state-box state-box--error" role="alert">
      <div className="state-box__icon">
        <FiAlertCircle />
      </div>
      <h2>{title}</h2>
      <p>{error?.message || "Please try again in a moment."}</p>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
