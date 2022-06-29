import {DashboardEvent} from "../reducers/dashboardReducer";
import {store} from "../index";
import {shopService} from "../service/shopService";

const getProducts = async () => {


}

const getOrders = async () => {
    try {
        console.log('try get orders')
        const orders = await shopService.getOrders()
        store.dispatch({
            type: DashboardEvent.GET_ORDERS,
            payload: {
                orders: [...orders]
            }
        })
    } catch (e) {
        console.log('Failed get orders', e);
        store.dispatch({
            type: DashboardEvent.GET_ORDERS,
            payload: {
                orders: []
            }
        })
    }
}

export const DashboardAction = {
    getOrders: getOrders,
    getProducts: getProducts,
}