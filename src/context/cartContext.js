import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getlocalData = () => {
  let localCartData = localStorage.getItem("cart");
  // if (localCartData === []) {
  //   return [];
  // } else {
  //   return JSON.parse(localCartData);
  // }
  const parsedData = JSON.parse(localCartData);
  if (!Array.isArray(parsedData)) {
    return [];
  }
  return parsedData;
};

const initialState = {
  cart: getlocalData(),
  total_items: "",
  total_amount: "",
  shipping_fee: 50000,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, activeColor, prod, amount) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, activeColor, prod, amount },
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const setInc = (id) => {
    dispatch({
      type: "INC",
      payload: id,
    });
  };

  const setDec = (id) => {
    dispatch({
      type: "DEC",
      payload: id,
    });
  };

  useEffect(() => {
    // dispatch({
    //   type: "TOTAL_ITEMS",
    // });
    // dispatch({
    //   type: "TOTAL_PRICE",
    // });
    dispatch({
      type: "TOTAL_CART",
    });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setInc,
        setDec,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
