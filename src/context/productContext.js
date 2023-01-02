import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

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

  const fetchData = async (url) => {
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.get(url);
      const jsonData = await res.data;
      dispatch({ type: "SET_API_DATA", payload: jsonData });
    } catch (error) {
      dispatch({ type: "ERROR" });
      console.log(error);
    }
  };

  const fetchSingleData = async (url) => {
    try {
      dispatch({ type: "SINGLE_LOADING" });
      const res = await axios.get(url);
      const singleJsonData = await res.data;
      dispatch({ type: "SET_SINGLE_DATA", payload: singleJsonData });
    } catch (error) {
      dispatch({ type: "SINGLE_ERROR" });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, fetchSingleData }}>
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useProductContext };
