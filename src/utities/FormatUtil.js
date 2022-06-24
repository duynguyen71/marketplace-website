export const formatCurrency = (c, value) => {
  if (!value || isNaN(value)) {
    return "";
  }
  return c + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
