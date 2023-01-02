import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  gridView: false,
  filterProducts: [],
  all_products: [],
  sorting_value: "lowest",
  filter: {
    text: "",
    category: "All",
    company: "All",
    color: "All",
    price: 0,
    maxPrice: 0,
    minPrice: 0,
  },
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductContext();

  const setGridView = () => {
    dispatch({ type: "SET_GRID_VIEW" });
  };

  const setListView = () => {
    dispatch({ type: "SET_LIST_VIEW" });
  };

  const sorting = (event) => {
    dispatch({ type: "GET_SORT_VALUE", payload: event.target.value });
  };

  const valueChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    return dispatch({ type: "SET_FILTER", payload: { name, value } });
  };

  const clearFilter = () => {
    return dispatch({ type: "CLEAR_FILTER" });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORT_PRODUCTS" });
  }, [state.sorting_value, state.filter]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PROD", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        valueChange,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
