import { productNewConstants } from "../constants/product-new.constants";

const initialState = {
  product: {
    name: "",
    status: 1,
    active: 1,
    description: "",
    images: [],
    categoryPaths: [],
    brand: undefined,
    models: [],
    variants: [],
    coverImage: "",
  },
  selectedCategories: [],
  selectedImagePaths: [],
  isLoading: false,
};

const productNewReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case productNewConstants.SET_PRODUCT: {
      return {
        ...state,
        product: { ...data.product },
      };
    }
    case productNewConstants.SAVE_PRODUCT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case productNewConstants.SAVE_PRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case productNewConstants.SAVE_PRODUCT_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case productNewConstants.SET_SELECTED_CATEGORIES: {
      return {
        ...state,
        selectedCategories: [...data.selectedCategories],
      };
    }
    case productNewConstants.SET_SELECTED_IMAGE_PATHS: {
      return {
        ...state,
        selectedImagePaths: [...data.selectedImagePaths],
      };
    }
    default:
      return initialState;
  }
};
export default productNewReducer;
