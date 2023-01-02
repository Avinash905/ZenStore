import React from "react";
import { useFilterContext } from "../context/filterContext";
import ListView from "./ListView";
import FilterTop from "./FilterTop";
import FilterSide from "./FilterSide";
import Card from "./Card";
import "../style/allproducts.css";

const Products = () => {
  const { gridView, filterProducts } = useFilterContext();
  return (
    <section className="products-page">
      <div className="products-cont container grid grid-one-two">
        <FilterSide />
        <div>
          <FilterTop len={filterProducts.length} gridView={gridView} />
          {gridView ? (
            <div className="grid grid-three feature-prod">
              {filterProducts.map((prod) => {
                return <Card key={prod.id} prod={prod} />;
              })}
            </div>
          ) : (
            <div className="list-cards-cont">
              {filterProducts.map((prod) => {
                return <ListView key={prod.id} prod={prod} />;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
