const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, activeColor, prod, amount } = action.payload;
      let existingProd = state.cart.find((cur) => {
        return cur.id === id + activeColor;
      });

      if (existingProd) {
        let updatedAmount = state.cart.map((ele) => {
          if (ele.id === id + activeColor) {
            let newAmount = ele.amount + amount;
            if (newAmount > ele.max) {
              newAmount = ele.max;
            }
            return {
              ...ele,
              amount: newAmount,
            };
          } else {
            return ele;
          }
        });

        return {
          ...state,
          cart: updatedAmount,
        };
      } else {
        let cartProd = {
          id: id + activeColor,
          name: prod.name,
          image: prod.image[0].url,
          color: activeColor,
          amount: amount,
          price: prod.price,
          max: prod.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cartProd],
        };
      }

    case "INC":
      let updatedAmount = state.cart.map((ele) => {
        if (ele.id === action.payload) {
          let newAmount = ele.amount + 1;
          if (newAmount > ele.max) {
            newAmount = ele.max;
          }
          return {
            ...ele,
            amount: newAmount,
          };
        } else {
          return {
            ele,
          };
        }
      });
      return {
        ...state,
        cart: updatedAmount,
      };

    case "DEC":
      let incAmount = state.cart.map((ele) => {
        if (ele.id === action.payload) {
          let newAmount = ele.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return {
            ...ele,
            amount: newAmount,
          };
        } else {
          return {
            ele,
          };
        }
      });
      return {
        ...state,
        cart: incAmount,
      };

    // case "TOTAL_ITEMS":
    //   let totalItems = state.cart.reduce((init, curr) => {
    //     let { amount } = curr;
    //     init = init + amount;
    //     return init;
    //   }, 0);
    //   return {
    //     ...state,
    //     total_items: totalItems,
    //   };

    // case "TOTAL_PRICE":
    //   let totalPrice = state.cart.reduce((init, curr) => {
    //     let { price, amount } = curr;
    //     init = init + amount * price;
    //     return init;
    //   }, 0);
    //   return {
    //     ...state,
    //     total_amount: totalPrice,
    //   };

    case "TOTAL_CART":
      let { totalPrice, totalItems } = state.cart.reduce(
        (accum, curr) => {
          let { price, amount } = curr;
          accum.totalPrice += amount * price;
          accum.totalItems += amount;
          return accum;
        },
        {
          totalPrice: 0,
          totalItems: 0,
        }
      );
      return {
        ...state,
        total_amount: totalPrice,
        total_items: totalItems,
      };

    case "REMOVE_ITEM":
      let updatedCart = state.cart.filter((ele) => {
        return ele.id !== action.payload;
      });

      return {
        ...state,
        cart: updatedCart,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
