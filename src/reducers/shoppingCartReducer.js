let cartFromStorage = localStorage.getItem('cart');
const initialState = cartFromStorage != null ? JSON.parse(cartFromStorage) : [];
//shopping cart reducer
const shoppingCartReducer = (state = initialState, action) => {

    switch (action.type) {
        //add item in cart
        case cartActionType.ADD_ITEM: {
            let newItem = action.item;
            let tmp = [...state];
            //check item exist
            let i = state.findIndex((item) => item.id === newItem.id);
            if (i === -1) {
                //add un existed item
                console.log(`add item ${newItem} qty: ${action.qty} to shopping cart`);
                tmp.push({...newItem, qty: action.qty});
            } else {
                //update item if exist
                console.log(`update item ${newItem} qty: ${action.qty} to shopping cart`);
                tmp = tmp.map((item) => item.id != newItem.id ? item : {...item, qty: action.qty});
            }
            localStorage.setItem('cart', JSON.stringify(tmp));
            return tmp;
        }
        case cartActionType.REMOVE_ITEM: {
            console.log(`remove item ${action.id} in cart`);
            let newState = [...state.filter(item => item.id != action.id)];
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
        //clear all items
        case cartActionType.CLEAR_CART: {
            console.log('clear all items');
            localStorage.removeItem('cart');
            return [];
        }
        //update item 
        case cartActionType.UPDATE_ITEM_QTY: {
            console.log(`update cart item : ${action.id} qty: ${action.qty}`);
            console.log(action);
            let newState = [
                ...state.map(item => item.id !== action.id ? item : {
                    ...item,
                    qty: action.qty,
                })
            ];
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        }
        default: {
            return state;
        }
    }


}

export default shoppingCartReducer;

export const cartActionType = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_CART: 'CLEAR_ITEM',
    UPDATE_ITEM_QTY: 'UPDATE_ITEM_QTY'
}