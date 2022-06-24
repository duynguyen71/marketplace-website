import { productNewConstants } from "../constants/product-new.constants";
import { store } from "../index";
import productService from "../service/product.service";

const setProduct = (product) => {
  store.dispatch({
    type: productNewConstants.SET_PRODUCT,
    data: {
      product: product,
    },
  });
  return;
};

const setSelectedCategories = (categories) => {
  store.dispatch({
    type: productNewConstants.SET_SELECTED_CATEGORIES,
    data: {
      selectedCategories: categories,
    },
  });
};

const setSelectedImagePaths = (selectedImagePaths) => {
  store.dispatch({
    type: productNewConstants.SET_SELECTED_IMAGE_PATHS,
    data: {
      selectedImagePaths: selectedImagePaths,
    },
  });
};

const saveProduct = async (product) => {
  store.dispatch({
    type: productNewConstants.SAVE_PRODUCT_REQUEST,
  });
  try {
    const resp = await productService.saveProduct(product);
    return resp;
  } catch (e) {
    store.dispatch({
      type: productNewConstants.SAVE_PRODUCT_FAILURE,
    });
    throw e;
  }
};

export const productNewAction = {
  setProduct: setProduct,
  setSelectedCategories: setSelectedCategories,
  setSelectedImagePaths: setSelectedImagePaths,
  saveProduct: saveProduct,
};
