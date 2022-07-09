import {userConstants} from "../constants/userConstants";

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {loggedIn: true, loggingIn: true, user: user} : {
    loggedIn: false,
    loggingIn: false,
};

const authenticateReducer = (state = initialState, action) => {
    const {type} = action;
    switch (type) {
        case userConstants.LOGIN_REQUEST: {
            return {
                loggingIn: true,
            }
        }
        case userConstants.LOGIN_SUCCESS: {
            return {
                loggedIn: true,
                loggingIn: true,
                user: action.payload.user
            }
        }
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                loggingIn: false,

            };
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                loggingIn: false,
                user: null,
            };
        case  userConstants.GET_USER_DETAIL_SUCCESS: {
            return {
                loggedIn: true,
                loggingIn: true,
                user: action.payload.user
            }
        }
        case userConstants.UPDATE_USER_DETAIL : {
            return {
                ...state,
                user: {...state.user, ...action.payload.user},
            }
        }
        default:
            return initialState;
    }
}
export default authenticateReducer;