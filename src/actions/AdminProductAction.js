import ProductConstants from "../constants/ProductConstants";
import productService from "../service/product.service";
import { store } from "../index";

const getProduct = async (id) => {
  store.dispatch({
    type: ProductConstants.FETCH_PRODUCT_REQUEST,
  });
  try {
    const resp = await productService.getProductDetail(id);
    store.dispatch({
      type: ProductConstants.FETCH_PRODUCT_SUCCESS,
      data: {
        product: resp.data,
      },
    });
    return resp.data;
  } catch (err) {
    store.dispatch({
      type: ProductConstants.FETCH_PRODUCT_FAILURE,
    });
  }
};

const updateProduct = (product) => {
  store.dispatch({
    type: ProductConstants.UPDATE_PRODUCT,
    data: {
      product: product,
    },
  });
};
const AdminProductAction = {
  getProduct: getProduct,
  updateProduct: updateProduct,
};
export default AdminProductAction;
