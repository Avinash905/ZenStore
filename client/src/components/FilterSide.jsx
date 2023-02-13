import React from "react";
import { useFilterContext } from "../context/filterContext";
import { TiTick } from "react-icons/ti";
import PriceFormat from "./PriceFormat";

const FilterSide = () => {
  const {
    filter: { text, category, color, price, maxPrice, minPrice },
    all_products,
    valueChange,
    clearFilter,
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((ele) => {
      return ele[property];
    });

    if (property === "colors") {
      newVal = newVal.flat();
    }
    let uniqueData = ["All", ...new Set(newVal)];
    return uniqueData;
  };

  const categoryUnique = getUniqueData(all_products, "category");
  const companyUnique = getUniqueData(all_products, "company");
  const colorUnique = getUniqueData(all_products, "colors");

  return (
    <div className="filterside">
      <form>
        <input
          name="text"
          type="text"
          placeholder="search"
          className="filterside-input"
          value={text}
          onChange={valueChange}
        />
      </form>
      <div className="category side-filter-cont">
        <h3>Category</h3>
        {categoryUnique.map((cate, index) => {
          return (
            <button
              type="button"
              key={index}
              className={category === cate ? "active" : null}
              name="category"
              value={cate}
              onClick={valueChange}
            >
              {cate}
            </button>
          );
        })}
      </div>
      <div className="company side-filter-cont">
        <h3>Company</h3>
        <select name="company" id="company" onChange={valueChange}>
          {companyUnique.map((comp, index) => {
            return (
              <option key={index} name="company" value={comp}>
                {comp}
              </option>
            );
          })}
        </select>
      </div>
      <div className="color-filter side-filter-cont">
        <h3>Colors</h3>
        <div className="color-cont">
          {colorUnique.map((col) => {
            if (col === "All") {
              return (
                <button
                  type="button"
                  key={col}
                  value={col}
                  name="color"
                  onClick={valueChange}
                  className="btn-all"
                >
                  All
                </button>
              );
            }
            return (
              <button
                type="button"
                key={col}
                value={col}
                name="color"
                className="cartColor"
                onClick={valueChange}
                style={{ backgroundColor: `${col}` }}
              >
                {color === col ? <TiTick className="active-tick" /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="slider-filter side-filter-cont">
        <h3>Price</h3>
        <p>
          <PriceFormat price={price} />
        </p>
        <input
          name="price"
          type="range"
          min={minPrice}
          max={maxPrice}
          value={price}
          className="slider"
          onChange={valueChange}
        />
      </div>
      <div className="clear-filter side-filter-cont">
        <button onClick={clearFilter} className="clear-btn">
          clear filters
        </button>
      </div>
    </div>
  );
};

export default FilterSide;
