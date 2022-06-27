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
        console.log('tokens', data);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        //get user detail
        const r = await userService.getCurrentUserDetail();
        const userDetail = r.data;
        localStorage.setItem('user', JSON.stringify(userDetail));
        store.dispatch({
            type: userConstants.LOGIN_SUCCESS,
            payload: {user: userDetail},
        })
        return;
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
    localStorage.clear();
    store.dispatch({
        type: userConstants.LOGOUT
    })
}

const getUserDetail = async () => {
    if (localStorage.getItem('access_token')) {
        let resp = await userService.getCurrentUserDetail();
        const userdata = await resp.data;
        localStorage.setItem('user', JSON.stringify(userdata));
        store.dispatch({
            type: userConstants.GET_USER_DETAIL_SUCCESS,
            payload: {user: userdata},
        });
        return;
    } else {
        store.dispatch({
            type: userConstants.LOGOUT,
        });
        throw 'Failed get user detail';
    }

}

export const authAction = {
    login,
    logout,
    getUserDetail
}