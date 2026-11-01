function ProductDetailsLoading() {
  return (
    <div className="item_details" role="status" aria-label="Loading product">
      <div className="container">
        <div className="imgs_item">
          <div className="big_img skeltion" style={{ height: 460 }} />
        </div>
        <div className="details_item">
          <div className="sk-line skeltion" style={{ width: "30%" }} />
          <div className="sk-line skeltion" style={{ width: "80%", height: 36, margin: "14px 0" }} />
          <div className="sk-line skeltion" style={{ width: "35%" }} />
          <div className="sk-line skeltion" style={{ width: "25%", height: 30, margin: "20px 0" }} />
          <div className="sk-line skeltion" />
          <div className="sk-line skeltion" />
          <div className="sk-line skeltion" style={{ width: "70%" }} />
          <div className="sk-line skeltion" style={{ width: "100%", height: 52, marginTop: 28 }} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsLoading;
