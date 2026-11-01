import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiCheckCircle, FiInfo } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHero from "../../component/layout/PageHero";
import EmptyState from "../../component/common/EmptyState";
import FormField from "../../component/common/FormField";
import OrderSummary from "../../component/common/OrderSummary";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/pricing";
import { isValidEmail, isValidPhone, isValidPostal } from "../../utils/validation";
import "./checkout.css";

const INITIAL = { fullName: "", email: "", phone: "", address: "", city: "", postalCode: "", country: "", payment: "card" };

const COUNTRIES = ["Egypt", "United States", "United Kingdom", "Canada", "Germany", "France", "United Arab Emirates", "Saudi Arabia", "Other"];

function validate(values) {
  const errors = {};
  if (values.fullName.trim().length < 3) errors.fullName = "Please enter your full name.";
  if (!isValidEmail(values.email)) errors.email = "Enter a valid email address.";
  if (!isValidPhone(values.phone)) errors.phone = "Enter a valid phone number.";
  if (values.address.trim().length < 5) errors.address = "Please enter your street address.";
  if (values.city.trim().length < 2) errors.city = "Please enter your city.";
  if (!isValidPostal(values.postalCode)) errors.postalCode = "Enter a valid postal code.";
  if (!values.country) errors.country = "Please choose a country.";
  return errors;
}

const makeOrderNumber = () => `BEL-${Date.now().toString(36).toUpperCase().slice(-6)}`;

function Checkout() {
  const cart = useCart();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      document.querySelector(".field.has-error input, .field.has-error select")?.focus();
      return;
    }

    setOrder({
      number: makeOrderNumber(),
      placedAt: new Date(),
      customer: values,
      items: cart.cartItems,
      totals: { subtotal: cart.subtotal, savings: cart.savings, shipping: cart.shipping, total: cart.total },
    });
    cart.clearCart();
    toast.success("Demo order placed!");
    window.scrollTo({ top: 0 });
  };

  if (order) {
    return (
      <>
        <PageHero title="Thank you!" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Checkout" }]} />
        <div className="container section-pad">
          <div className="confirmation">
            <FiCheckCircle className="confirmation__icon" />
            <h2>Demo order {order.number} confirmed</h2>
            <p>
              Thanks, {order.customer.fullName.split(" ")[0]}. This is a portfolio demo, so nothing was charged, shipped or
              sent to {order.customer.email}.
            </p>

            <ul className="confirmation__items">
              {order.items.map((item) => (
                <li key={item.id}>
                  <img src={item.thumbnail} alt="" />
                  <span>
                    {item.title} <small>× {item.quantity}</small>
                  </span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </li>
              ))}
            </ul>

            <OrderSummary totals={order.totals} title="Order total" />

            <p className="confirmation__ship">
              Would ship to: {order.customer.address}, {order.customer.city} {order.customer.postalCode}, {order.customer.country}
            </p>

            <Link to="/shop" className="btn btn--primary btn--lg">
              Continue shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (cart.cartItems.length === 0) {
    return (
      <>
        <PageHero title="Checkout" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
        <div className="container section-pad">
          <EmptyState
            icon={<FiShoppingBag />}
            title="Your cart is empty"
            message="Add something to your cart before checking out."
            actionLabel="Browse products"
            actionTo="/shop"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title="Checkout" breadcrumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

      <div className="container checkout-layout section-pad">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="notice">
            <FiInfo />
            <p>This is a demo checkout. No payment is processed and no order is placed.</p>
          </div>

          <fieldset>
            <legend>Contact</legend>
            <div className="form-grid">
              <FormField label="Full name" name="fullName" autoComplete="name" value={values.fullName} onChange={handleChange} error={errors.fullName} className="span-2" />
              <FormField label="Email" type="email" name="email" autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
              <FormField label="Phone" type="tel" name="phone" autoComplete="tel" value={values.phone} onChange={handleChange} error={errors.phone} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Shipping address</legend>
            <div className="form-grid">
              <FormField label="Street address" name="address" autoComplete="street-address" value={values.address} onChange={handleChange} error={errors.address} className="span-2" />
              <FormField label="City" name="city" autoComplete="address-level2" value={values.city} onChange={handleChange} error={errors.city} />
              <FormField label="Postal code" name="postalCode" autoComplete="postal-code" value={values.postalCode} onChange={handleChange} error={errors.postalCode} />
              <FormField as="select" label="Country" name="country" autoComplete="country-name" value={values.country} onChange={handleChange} error={errors.country} className="span-2">
                <option value="">Select a country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </FormField>
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment method (demo)</legend>
            <div className="radio-cards">
              <label className={values.payment === "card" ? "is-active" : ""}>
                <input type="radio" name="payment" value="card" checked={values.payment === "card"} onChange={handleChange} />
                <span>
                  <strong>Credit / debit card</strong>
                  <small>Simulated — no card details are collected</small>
                </span>
              </label>
              <label className={values.payment === "cod" ? "is-active" : ""}>
                <input type="radio" name="payment" value="cod" checked={values.payment === "cod"} onChange={handleChange} />
                <span>
                  <strong>Cash on delivery</strong>
                  <small>Simulated — pay when it arrives</small>
                </span>
              </label>
            </div>
          </fieldset>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            Place demo order · {formatPrice(cart.total)}
          </button>
        </form>

        <aside className="checkout-side">
          <ul className="checkout-items">
            {cart.cartItems.map((item) => (
              <li key={item.id}>
                <span className="checkout-items__img">
                  <img src={item.thumbnail} alt="" />
                  <em>{item.quantity}</em>
                </span>
                <span className="checkout-items__title">{item.title}</span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
          <OrderSummary />
          <Link to="/cart" className="link-arrow">
            Edit cart
          </Link>
        </aside>
      </div>
    </>
  );
}

export default Checkout;
