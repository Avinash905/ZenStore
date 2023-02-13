import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/productReducer";
import fetchData from "../helper/apiCall";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  featureProducts: [],
  products: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = async (url) => {
    try {
      dispatch({ type: "LOADING", payload: true });
      const data = await fetchData(url);
      dispatch({ type: "SET_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
      console.log(error);
    }
  };

  const setLoading = (value) => {
    dispatch({ type: "LOADING", payload: value });
  };

  const fetchSingleData = async (url) => {
    try {
      dispatch({ type: "SINGLE_LOADING" });
      const data = await fetchData(url);
      dispatch({ type: "SET_SINGLE_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "SINGLE_ERROR" });
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{ ...state, fetchSingleData, setLoading, fetchItems }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useProductContext };
