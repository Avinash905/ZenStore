import React, { useEffect } from "react";
import { useProductContext } from "../context/productContext";
import Card from "./Card";
import "../style/featureservices.css";
import Loading from "./Loading";

const FeatureServices = () => {
  const { featureProducts, isLoading, fetchItems } = useProductContext();

  useEffect(() => {
    fetchItems(`/item/getitems`);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="feature-section">
      <div className="container feature-cont">
        <span>CHECK NOW!</span>
        <h2>Our Feature Services</h2>
        <div className="flex-center feature-prod">
          {featureProducts.map((prod) => {
            return (
              <Card
                key={prod._id}
                prod={prod}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureServices;
