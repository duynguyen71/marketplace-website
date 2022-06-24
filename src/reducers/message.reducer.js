import {messageConstants} from "../constants/message.constants";

const initialState = {};

const messageReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (action.type) {
        case messageConstants.SET_MESSAGE: {
            return {
                message: payload
            }
        }
        case  messageConstants.CLEAR_MESSAGE : {
            return {
                message: null
            }
        }
        default :
            return state;
    }
}
export default messageReducer;