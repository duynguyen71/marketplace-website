import {store} from "../index";
import {userConstants} from "../constants/userConstants";
import userService from '../service/user.service';
import {messageConstants} from "../constants/message.constants";


const login = async (email, password) => {
    store.dispatch({
        type: userConstants.LOGIN_REQUEST
    })
    try {
        const data = await userService.login(email, password);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        const resp = await userService.getCurrentUserDetail();
        const userDetail = resp.data;
        localStorage.setItem('user', JSON.stringify(userDetail));
        store.dispatch({
            type: userConstants.LOGIN_SUCCESS,
            user: userDetail,
        })
    } catch (e) {
        store.dispatch({
            type: userConstants.LOGIN_FAILURE,
        })
        store.dispatch({
            type: messageConstants.SET_MESSAGE,
            payload: "Authenticate Failed"
        })
        console.log("Failed to log in! ", e);
        throw  'Failed to log in!';
    }
}
const logout = () => {
    store.dispatch({
        type: userConstants.LOGOUT
    })
    userService.logout();

}

const getUserDetail = async () => {
    if(localStorage.getItem('access_token')){
        let resp = await userService.getCurrentUserDetail();
        localStorage.setItem('user', JSON.stringify(resp.data));
        store.dispatch({
            type: userConstants.GET_USER_DETAIL_SUCCESS,
            user: resp.data
        })
    }

}

export const authAction = {
    login,
    logout,
    getUserDetail
}