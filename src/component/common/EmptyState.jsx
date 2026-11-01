import { Link } from "react-router-dom";

export default function EmptyState({ icon, title, message, actionLabel, actionTo, children }) {
  return (
    <div className="state-box">
      {icon && <div className="state-box__icon">{icon}</div>}
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn--primary">
          {actionLabel}
        </Link>
      )}
      {children}
    </div>
  );
}
