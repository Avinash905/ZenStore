const PriceFormat = (props) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(props.price);
};

export default PriceFormat;
