const productReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_API_DATA":
      const featureProd = action.payload.filter((ele) => {
        return ele.featured === true;
      });
      return {
        ...state,
        featureProducts: featureProd,
        products: action.payload,
        isLoading: false,
        isError: false,
      };

    case "SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };
    case "SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };
    case "SET_SINGLE_DATA":
      return {
        ...state,
        singleProduct: action.payload,
        isSingleLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};

export default productReducer;
