import React from "react";
import { useProductContext } from "../context/productContext";
import Card from "./Card";
import "../style/featureservices.css";
import Loading from "./Loading";

const FeatureServices = () => {
  const { featureProducts, isLoading } = useProductContext();
  return isLoading ? (
    <Loading />
  ) : (
    <section className="feature-section">
      <div className="container feature-cont">
        <span>CHECK NOW!</span>
        <h2>Our Feature Services</h2>
        <div className="grid grid-three feature-prod">
          {featureProducts.map((prod) => {
            return <Card key={prod.id} prod={prod} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureServices;
