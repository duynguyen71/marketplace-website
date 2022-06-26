import {userConstants} from "../constants/userConstants";

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {loggedIn: true, loggingIn: true, user: user} : {loggedIn: false, loggingIn: false,};

const authenticateReducer = (state = initialState, action) => {

    const {type, user} = action;
    switch (type) {
        case userConstants.LOGIN_REQUEST: {
            return {
                loggingIn: true,
                user: user
            }
        }
        case userConstants.LOGIN_SUCCESS: {
            return {
                loggedIn: true,
                loggingIn: true,
                user: user
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
            };
        case  userConstants.GET_USER_DETAIL_SUCCESS: {
            console.log(user);
            return {
                loggedIn: true,
                loggingIn: true,
                user: user
            }
        }
        default:
            return initialState;
    }
}
export default authenticateReducer;