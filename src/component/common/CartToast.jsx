import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

export default function CartToast({ toastId, product, message }) {
  return (
    <div className="stoast-wrapper">
      {product.thumbnail || product.images?.[0] ? (
        <img src={product.thumbnail || product.images[0]} alt="" className="toast-img" />
      ) : (
        <FaCheckCircle className="toast-icon" />
      )}
      <div className="toast-content">
        <strong>{product.title}</strong>
        <span className="toast-message">{message}</span>
        <Link to="/cart" className="toast-link" onClick={() => toast.dismiss(toastId)}>
          View cart
        </Link>
      </div>
    </div>
  );
}
