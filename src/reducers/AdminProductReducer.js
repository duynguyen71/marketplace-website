import ProductConstants from "../constants/ProductConstants";

const initialState = {
  product: {},
  isLoading: false,
};
const adminProductReducer = (state = initialState, action) => {
  const { data, type } = action;
  switch (type) {
    case ProductConstants.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ProductConstants.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: data.product,
        isLoading: false,
      };
    case ProductConstants.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ProductConstants.UPDATE_PRODUCT:
      return {
        ...state,
        product: data.product,
      };

    default:
      return {
        ...state,
      };
  }
};

export default adminProductReducer;
