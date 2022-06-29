const initState = {
    products: [],
    orders: [],
};
export const DashboardEvent = {
    GET_PRODUCTS: 'GET_PRODUCTS',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    GET_ORDERS: 'GET_ORDERS',
    UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
};
const dashboardReducer = (state = initState, action) => {
    const {payload} = action;

    switch (action.type) {
        //get all shop products
        case DashboardEvent.GET_PRODUCTS : {
            return {
                ...state,
                products: payload.products
            }
        }
        //remove product by id
        case DashboardEvent.REMOVE_PRODUCT: {
            return {
                ...state,
                products: [...state.products.filter(product => product.id !== payload.id)]
            }
        }
        //get orders
        case  DashboardEvent.GET_ORDERS : {
            return {
                ...state,
                orders: payload.orders
            }
        }
        //update order status

        default:
            return state;
    }

}


export default dashboardReducer;