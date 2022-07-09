import axiosClient from "../api/axiosClient";

const login = async (email, password) => {
    try {
        const url = `/api/v1/public/login`;
        const data = await axiosClient.post(url, {
            email: email,
            password: password
        })
        return data;
    } catch (e) {
        throw new Error("Failed to login");
    }
}


const getCurrentUserDetail = async () => {
    const url = `/api/v1/member/users/me`;
    const data = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    return data;
}

const registration = async (phone, email, password) => {
    console.log('registration')
    const url = `/api/v1/public/users/registration`;
    const resp = await axiosClient.post(url, {
        email: email,
        phone: phone,
        password: password
    }, {
        headers: {"Content-Type": "application/json"}
    })
    return resp;
}

const verificationAccount = async (code) => {
    const url = '/api/v1/public/verification';
    const resp = await axiosClient.get(url, {
        headers: {
            "code": code
        }
    })
    localStorage.setItem('access_token', resp.access_token);
    localStorage.setItem('refresh_token', resp.refresh_token);
    return resp;
}

const getAddresses = async () => {
    console.log('get addresses');
    const url = '/api/v1/member/users/me/addresses';
    const resp = await axiosClient.get(url, getHeaderConfig());
    return resp;

}
const saveAddress = async (address) => {
    const url = '/api/v1/member/users/me/addresses';
    try {
        const resp = await axiosClient.post(url, {...address}, getHeaderConfig());
        const data = await resp.data;
        return data;
    } catch (e) {
        console.log('Failed to save address ', e);
    }
}

function getHeaderConfig() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type":
                "application/json",
        }
    };
}

const placeOrder = async (placeOrderData) => {
    console.log('place order...');
    const url = "/api/v1/member/orders";
    try {
        const resp = axiosClient.post(url, {...placeOrderData}, getHeaderConfig())
        const data = await resp.data;
        return data;
    } catch (e) {
        console.log(e);
        throw 'Failed to place order';
    }
}
const getCurrentUserOrders = async (status) => {
    const url = `/api/v1/member/users/me/orders?status=${status}`;
    try {
        const resp = await axiosClient.get(url, getHeaderConfig());
        const data = await resp.data;
        return data;
    } catch (e) {
        console.log('Failed get current user orders', e);
    }

}
const saveFeedback = async (productId, rating, comment) => {
    const url = `/api/v1/member/users/me/feedbacks`;
    try {
        const resp = await axiosClient.post(url, {
            "productId": productId,
            "comment": comment,
            "rating": rating,
        }, getHeaderConfig());
        const data = await resp.data;
        console.log('save feedback success');
        return data;
    } catch (e) {
        console.log('Failed to save feedback', e);
    }
}
const updateUserDetail = async (userDetail) => {
    const url = `/api/v1/member/users/me`;
    const resp = await axiosClient.post(url, {...userDetail}, getHeaderConfig());
    return resp;
}

export default {
    login,
    getCurrentUserDetail,
    registration,
    verificationAccount,
    getAddresses,
    saveAddress,
    placeOrder,
    getCurrentUserOrders,
    saveFeedback,
    updateUserDetail
}