import { useProductContext } from "../context/productContext";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { ImagesDisplay } from "./ImagesDisplay";
import { NavLink } from "react-router-dom";
import "../style/singleproduct.css";
import PriceFormat from "./PriceFormat";
import { TbTruckDelivery } from "react-icons/tb";
import { TbReplace } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import Stars from "./Stars";
import AddCart from "./AddCart";

const SINGLE_API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const param = useParams();
  const { fetchSingleData, singleProduct, isSingleLoading } =
    useProductContext();

  useEffect(() => {
    fetchSingleData(`${SINGLE_API}/${param.id}`);
  }, [param.id]);

  return isSingleLoading ? (
    <Loading />
  ) : (
    <section className="single-prod-section">
      <div className="go-back">
        <NavLink to="/ZenStore" className="product-home">
          Home
        </NavLink>
        /{singleProduct.name}
      </div>
      <div className="single-product-cont container grid grid-two">
        <ImagesDisplay image={singleProduct.image} />
        <div className="single-prod-right">
          <h3>{singleProduct.name}</h3>

          <p>
            <Stars stars={singleProduct.stars} /> ({singleProduct.reviews}{" "}
            customer reviews)
          </p>
          <p className="mrp">
            MRP:{" "}
            <del>
              <PriceFormat price={singleProduct.price + 100000} />
            </del>
          </p>
          <p className="dealofday">
            Deal of the Day: <PriceFormat price={singleProduct.price} />
          </p>
          <p className="proddesc">{singleProduct.description}</p>
          <div className="options">
            <div className="product-warranty-data">
              <TbTruckDelivery className="warranty-icon" />
              <p>Free Delivery</p>
            </div>

            <div className="product-warranty-data">
              <TbReplace className="warranty-icon" />
              <p>30 Days Replacement</p>
            </div>

            <div className="product-warranty-data">
              <TbTruckDelivery className="warranty-icon" />
              <p>Safe Delivery </p>
            </div>

            <div className="product-warranty-data">
              <MdSecurity className="warranty-icon" />
              <p>2 Years Warranty </p>
            </div>
          </div>
          <p>
            Available:{" "}
            <span>
              {singleProduct.stock > 0 ? "In stock" : "Not Available"}
            </span>
          </p>
          <p>
            ID: <span>{singleProduct.id}</span>
          </p>
          <p>
            Brand: <span className="brand">{singleProduct.company}</span>
          </p>
          <hr />
          {singleProduct.stock > 0 ? <AddCart prod={singleProduct} /> : null}
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
