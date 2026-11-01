import { useState } from "react";

function ProductImages({ product }) {
  const images = product.images?.length ? product.images : [product.thumbnail].filter(Boolean);
  const [selected, setSelected] = useState(0);

  return (
    <div className="imgs_item">
      <div className="big_img">
        {images.length > 0 ? <img src={images[selected] ?? images[0]} alt={product.title} /> : <div className="big_img__empty">No image</div>}
      </div>

      {images.length > 1 && (
        <div className="small_img" role="tablist" aria-label="Product images">
          {images.map((img, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={selected === index}
              aria-label={`Show image ${index + 1}`}
              className={`div_img_ms ${selected === index ? "is-active" : ""}`}
              key={img}
              onClick={() => setSelected(index)}
            >
              <img src={img} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImages;
