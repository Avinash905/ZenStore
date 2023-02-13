import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const CartContext = createContext();

const initialState = {
  total_items: 0,
  shipping_fee: 150,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeItem = async (id, cartid) => {
    try {
      if (!window.confirm("Are you sure you want to remove the item?")) {
        return;
      }

      const data = await toast.promise(
        axios.delete(`/cart/deletecartitem/${id}/${cartid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "Item removed successfully",
          error: "Unable to remove item",
          loading: "Removed item...",
        }
      );
      dispatch({
        type: "INC",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to clear your cart?")) {
        return;
      }

      const data = await toast.promise(
        axios.delete(`/cart/deleteall/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "Cleared cart",
          error: "Unable to clear cart",
          loading: "Clearing cart...",
        }
      );
      dispatch({
        type: "INC",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setCartCount = (count) => {
    dispatch({
      type: "TOTAL_ITEMS",
      payload: count,
    });
  };

  const setInc = async (id, amount, max) => {
    try {
      if (amount >= max) {
        return toast.error("No more stock available");
      }

      const data = await toast.promise(
        axios.put(
          `/cart/updatecount/${id}`,
          {
            type: "inc",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Item increased",
          error: "Unable to increase item count",
          loading: "Increasing item...",
        }
      );
      dispatch({
        type: "INC",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setDec = async (id, amount) => {
    try {
      if (amount <= 1) {
        return toast.error("Items cannot be less than 1");
      }
      const data = await toast.promise(
        axios.put(
          `/cart/updatecount/${id}`,
          {
            type: "dec",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Item reduced successfully",
          error: "Unable to reduce item count",
          loading: "Reducing item...",
        }
      );
      dispatch({
        type: "DEC",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        removeItem,
        clearCart,
        setInc,
        setDec,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
