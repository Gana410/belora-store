import { FiTruck, FiRefreshCw, FiHeart, FiLock } from "react-icons/fi";
import { FREE_SHIPPING_THRESHOLD } from "../../data/catalog";

const ITEMS = [
  { icon: <FiTruck />, title: "Free shipping", text: `On all orders over $${FREE_SHIPPING_THRESHOLD}` },
  { icon: <FiRefreshCw />, title: "Easy returns", text: "30-day hassle-free returns" },
  { icon: <FiHeart />, title: "Curated for you", text: "Beauty & fashion we love" },
  { icon: <FiLock />, title: "Demo checkout", text: "No real payments, ever" },
];

export default function ValueProps() {
  return (
    <section className="value-props" aria-label="Why shop with Belora">
      <div className="container value-props__grid">
        {ITEMS.map((item) => (
          <div className="value-props__item" key={item.title}>
            <span className="value-props__icon">{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
