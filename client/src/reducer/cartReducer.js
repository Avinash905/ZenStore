const CartReducer = (state, action) => {
  switch (action.type) {
    case "TOTAL_ITEMS":
      return {
        ...state,
        total_items: action.payload,
      };
    case "INC":
      return {
        ...state,
        total_items: state.total_items + 1,
      };
    case "DEC":
      return {
        ...state,
        total_items: state.total_items - 1,
      };

    default:
      return state;
  }
};

export default CartReducer;
