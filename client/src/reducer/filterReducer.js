const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_GRID_VIEW":
      return {
        ...state,
        gridView: true,
      };
    case "SET_LIST_VIEW":
      return {
        ...state,
        gridView: false,
      };
    case "LOAD_FILTER_PROD":
      let priceArr = action.payload.map((ele) => {
        return ele.price;
      });
      let maxprice = Math.max(...priceArr);
      return {
        ...state,
        filterProducts: [...action.payload],
        all_products: [...action.payload],
        filter: {
          ...state.filter,
          price: maxprice,
          maxPrice: maxprice,
        },
      };
    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };
    case "SET_FILTER":
      let { name, value } = action.payload;
      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };
    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilter = [...all_products];

      const { text, category, company, color, price } = state.filter;

      if (text) {
        tempFilter = tempFilter.filter((ele) => {
          return ele.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      if (category !== "All") {
        tempFilter = tempFilter.filter((ele) => {
          return ele.category === category;
        });
      }

      if (company !== "All") {
        tempFilter = tempFilter.filter((ele) => {
          return ele.company.toLowerCase() === company.toLowerCase();
        });
      }
      if (color !== "All") {
        tempFilter = tempFilter.filter((ele) => {
          return ele.colors.includes(color);
        });
      }
      if (price === 0) {
        tempFilter = tempFilter.filter((ele) => {
          return ele.price === price;
        });
      } else {
        tempFilter = tempFilter.filter((ele) => {
          return ele.price <= price;
        });
      }

      return {
        ...state,
        filterProducts: tempFilter,
      };

    case "SORT_PRODUCTS":
      let newSortData;
      let { filterProducts } = state;
      let tempData = [...filterProducts];

      const sortProd = (a, b) => {
        if (state.sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (state.sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
        if (state.sorting_value === "lowest") {
          return a.price - b.price;
        }
        if (state.sorting_value === "highest") {
          return b.price - a.price;
        }
      };
      newSortData = tempData.sort(sortProd);

      return {
        ...state,
        filterProducts: newSortData,
      };

    case "CLEAR_FILTER":
      return {
        ...state,
        filter: {
          text: "",
          category: "All",
          company: "All",
          color: "All",
          price: state.filter.maxPrice,
          maxPrice: state.filter.maxPrice,
          minPrice: 0,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
