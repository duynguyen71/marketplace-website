import {combineReducers} from "redux";
import isLoggedReducer from "./isLogged";
import authenticateReducer from "./authentication.reducer";
import productNewReducer from "./productNew.reducer";
import adminProductReducer from "./AdminProductReducer";
import shoppingCartReducer from "./shoppingCartReducer";
import applicationReducer from "./app.reducer";
import dashboardReducer from "./dashboardReducer";

const allReducers = combineReducers({
    isLoggedReducer: isLoggedReducer,
    authenticateReducer: authenticateReducer,
    productNewReducer: productNewReducer,
    adminProductReducer: adminProductReducer,
    shoppingCartReducer: shoppingCartReducer,
    applicationReducer: applicationReducer,
    dashboardReducer : dashboardReducer,
});

export default allReducers;
