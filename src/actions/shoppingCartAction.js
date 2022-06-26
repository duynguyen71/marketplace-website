import {store} from "../index";
import {cartActionType} from "../reducers/shoppingCartReducer";


const addItem = (item, qty) => {
    store.dispatch({
        type: cartActionType.ADD_ITEM,
        item: item,
        qty: qty,
    },)
}

const removeItem = (productId) => {
    store.dispatch({
        type: cartActionType.REMOVE_ITEM,
        id: productId,
    })
}

const clearCart = () => {
    store.dispatch({
        type: cartActionType.CLEAR_CART,
    })
}

const updateCartItem = (itemId, qty) => {
    console.log('update cart item');
    store.dispatch({
        type: cartActionType.UPDATE_ITEM_QTY,
        id: itemId,
        qty: qty,
    })
}

export const shoppingCartAction = {
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
    updateCartItemQty: updateCartItem,

}