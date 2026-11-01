import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Product from "./Product";
import SectionHeading from "../common/SectionHeading";
import "./slideProduct.css";

const BREAKPOINTS = {
  0: { slidesPerView: 1.4, spaceBetween: 14 },
  480: { slidesPerView: 2, spaceBetween: 16 },
  768: { slidesPerView: 3, spaceBetween: 18 },
  1024: { slidesPerView: 4, spaceBetween: 20 },
  1280: { slidesPerView: 5, spaceBetween: 20 },
};

function SlideProduct({ data = [], title, eyebrow, subtitle, linkTo, linkLabel }) {
  if (!data.length) return null;

  return (
    <section className="slide_products">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} linkTo={linkTo} linkLabel={linkLabel} />

        <Swiper
          className="product-swiper"
          modules={[Autoplay, Navigation]}
          navigation
          breakpoints={BREAKPOINTS}
          autoplay={{ delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }}
          loop={data.length > 6}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Product item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SlideProduct;
