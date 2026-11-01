import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantitySelector({ value, onDecrease, onIncrease, min = 1, max = 10, label = "Quantity" }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" onClick={onDecrease} disabled={value <= min} aria-label="Decrease quantity">
        <FiMinus />
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={onIncrease} disabled={value >= max} aria-label="Increase quantity">
        <FiPlus />
      </button>
    </div>
  );
}
