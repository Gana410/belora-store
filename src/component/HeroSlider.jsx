import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import glow from "../img/glow.jpg";
import glow2 from "../img/glow2.jpg";
import fashion from "../img/fashion.jpg";
import fashion2 from "../img/fashion2.jpg";

const SLIDES = [
  {
    eyebrow: "Your beauty, your glow",
    title: "Elegance in every detail",
    text: "Carefully selected beauty essentials made to elevate your everyday routine.",
    cta: "Shop beauty",
    to: "/category/beauty",
    image: glow,
    tone: "#EFE6D9",
  },
  {
    eyebrow: "Skin that feels beautiful",
    title: "Nourish your natural glow",
    text: "Skincare that leaves your skin soft, hydrated and radiant.",
    cta: "Shop skin care",
    to: "/category/skin-care",
    image: glow2,
    tone: "#E7E6E4",
  },
  {
    eyebrow: "Wear your confidence",
    title: "Style that speaks for you",
    text: "Elegant fashion pieces crafted to bring sophistication to every look.",
    cta: "Shop dresses",
    to: "/category/womens-dresses",
    image: fashion,
    tone: "#E6D2C3",
  },
  {
    eyebrow: "Beauty meets elegance",
    title: "Everything you love, in one place",
    text: "Explore beauty and fashion essentials designed for you.",
    cta: "Explore the shop",
    to: "/shop",
    image: fashion2,
    tone: "#F0F0F0",
    contain: true,
  },
];

function HeroSlider() {
  return (
    <section className="hero" aria-label="Featured collections">
      <div className="container">
        <Swiper
          className="hero-swiper"
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={800}
          autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.title} style={{ "--tone": slide.tone }}>
              <div className="hero__content">
                <p className="eyebrow">{slide.eyebrow}</p>
                <h2>{slide.title}</h2>
                <p className="hero__text">{slide.text}</p>
                <Link to={slide.to} className="btn btn--primary btn--lg">
                  {slide.cta} <FiArrowRight />
                </Link>
              </div>
              <div className={`hero__image ${slide.contain ? "hero__image--contain" : ""}`}>
                <img src={slide.image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSlider;
