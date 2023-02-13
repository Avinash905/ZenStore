import React from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filterContext";

const FilterTop = (props) => {
  const { gridView, setGridView, setListView, sorting } = useFilterContext();

  return (
    <div className="filter-top">
      <div className="grid-list-btn">
        <button
          onClick={() => {
            setGridView();
          }}
          className={gridView ? "list-grid-active" : null}
        >
          <BsFillGridFill />
        </button>
        <button
          onClick={() => {
            setListView();
          }}
          className={!gridView ? "list-grid-active" : null}
        >
          <BsList />
        </button>
      </div>
      <p>{props.len} products available</p>
      <div className="dropdown">
        <form
          action="#
        "
        >
          <select name="sort" id="sort" onChange={sorting}>
            <option value="lowest">Price (Lowest)</option>
            <option value="highest">Price (Highest)</option>
            <option value="a-z">Price (a-z)</option>
            <option value="z-a">Price (z-a)</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default FilterTop;
