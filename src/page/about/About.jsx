import { Link } from "react-router-dom";
import { FiArrowRight, FiFeather, FiHeart, FiStar } from "react-icons/fi";
import PageHero from "../../component/layout/PageHero";
import glow from "../../img/glow.jpg";
import fashion from "../../img/fashion.jpg";
import "./about.css";

const VALUES = [
  { icon: <FiStar />, title: "Considered curation", text: "Every product earns its place. We favour well-made pieces over endless choice." },
  { icon: <FiHeart />, title: "Care in every detail", text: "From the first click to the final unboxing, we want the experience to feel personal." },
  { icon: <FiFeather />, title: "Effortless elegance", text: "Beauty and fashion that fit real life — easy to love, easy to wear, easy to reorder." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Beauty, curated with intention"
        subtitle="Belora brings together skincare, beauty and women's fashion for people who love the little rituals that make a day feel special."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <section className="container about-intro section-pad">
        <div className="about-intro__text">
          <p className="eyebrow">Who we are</p>
          <h2>A calmer way to shop</h2>
          <p>
            Belora began with a simple idea: shopping for beauty and style should feel inspiring, not overwhelming. We
            bring together carefully chosen products across skincare, makeup, fragrance, fashion and accessories — all in
            one elegant place.
          </p>
          <p>
            Our lotus mark stands for renewal and quiet confidence. It guides how we choose what to feature, and how we
            design every part of the store.
          </p>
          <Link to="/shop" className="btn btn--primary">
            Explore the collection <FiArrowRight />
          </Link>
        </div>

        <div className="about-intro__images">
          <img src={glow} alt="Skincare serum with a model" />
          <img src={fashion} alt="Fashion look in warm light" />
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="section-heading section-heading--center">
            <div>
              <p className="eyebrow">What we believe</p>
              <h2>Our values</h2>
            </div>
          </div>
          <div className="about-values__grid">
            {VALUES.map((v) => (
              <div className="about-values__card" key={v.title}>
                <span className="about-values__icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container about-cta section-pad">
        <h2>Questions? We'd love to hear from you.</h2>
        <Link to="/contact" className="btn btn--outline btn--lg">
          Contact us
        </Link>
      </section>
    </>
  );
}

export default About;
