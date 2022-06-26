import { combineReducers } from "redux";
import isLoggedReducer from "./isLogged";
import authenticateReducer from "./authentication.reducer";
import productNewReducer from "./productNew.reducer";
import adminProductReducer from "./AdminProductReducer";
import shoppingCartReducer from "./shoppingCartReducer";

const allReducers = combineReducers({
  isLoggedReducer: isLoggedReducer,
  authenticateReducer: authenticateReducer,
  productNewReducer: productNewReducer,
  adminProductReducer: adminProductReducer,
  shoppingCartReducer:shoppingCartReducer,
});

export default allReducers;
