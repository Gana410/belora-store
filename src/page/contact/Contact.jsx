import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiClock, FiCheckCircle, FiInfo } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHero from "../../component/layout/PageHero";
import FormField from "../../component/common/FormField";
import { isValidEmail } from "../../utils/validation";
import "./contact.css";

const INITIAL = { name: "", email: "", subject: "", message: "" };

const SUBJECTS = ["Order question", "Product advice", "Returns & exchanges", "Partnership", "Something else"];

function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!isValidEmail(v.email)) errors.email = "Enter a valid email address.";
  if (!v.subject) errors.subject = "Choose a topic.";
  if (v.message.trim().length < 10) errors.message = "Your message should be at least 10 characters.";
  return errors;
}

function Contact() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

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
      return;
    }
    // Demo only: there is no backend, so the message is validated but not sent anywhere.
    setSent(true);
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSent(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Questions about an order, a product or a partnership? Send us a note."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <div className="container contact-layout section-pad">
        <div className="contact-info">
          <h2>We're here to help</h2>
          <ul>
            <li>
              <FiMail />
              <span>
                <strong>Email</strong>
                hello@belora.example
              </span>
            </li>
            <li>
              <FiPhone />
              <span>
                <strong>Phone</strong>
                +1 (555) 010-2030
              </span>
            </li>
            <li>
              <FiMapPin />
              <span>
                <strong>Studio</strong>
                12 Lotus Lane, Sample City
              </span>
            </li>
            <li>
              <FiClock />
              <span>
                <strong>Hours</strong>
                Mon–Fri, 9am–6pm
              </span>
            </li>
          </ul>
          <p className="contact-info__note">Contact details shown are placeholders for this demo project.</p>
        </div>

        {sent ? (
          <div className="contact-success" role="status">
            <FiCheckCircle />
            <h2>Thanks, {values.name.split(" ")[0]}!</h2>
            <p>
              Your message passed validation. Because Belora is a demo store with no backend, it hasn't actually been sent
              anywhere.
            </p>
            <button type="button" className="btn btn--outline" onClick={reset}>
              Write another message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="notice">
              <FiInfo />
              <p>Demo form: messages are validated but not delivered.</p>
            </div>
            <div className="form-grid">
              <FormField label="Your name" name="name" autoComplete="name" value={values.name} onChange={handleChange} error={errors.name} />
              <FormField label="Email" type="email" name="email" autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
              <FormField as="select" label="Topic" name="subject" value={values.subject} onChange={handleChange} error={errors.subject} className="span-2">
                <option value="">Select a topic</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </FormField>
              <FormField as="textarea" rows={6} label="Message" name="message" value={values.message} onChange={handleChange} error={errors.message} className="span-2" />
            </div>
            <button type="submit" className="btn btn--primary btn--lg">
              Send message
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Contact;
