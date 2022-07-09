import axiosClient from "../api/axiosClient";


const getOrders = async () => {
    const url = '/api/v1/member/users/me/shop/orders';
    const resp = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    const data = await resp.data;
    return data;
}


const getOrderStatus = async () => {
    const url = '/api/v1/member/users/me/shop/orders/status';
    const resp = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    const data = await resp.data;
    return data;
}


const getFeedbacks = async () => {

    const url = '/api/v1/member/users/me/shop/feedbacks';
    const resp = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    const data = await resp.data;
    console.log('get feedbacks', data);
    return data;
}

const getProductDetail = async (productId) => {
    const url = `/api/v1/member/users/me/shop/products/${productId}`
    const resp = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    const data = await resp.data;
    return data;
}

function getHeaderConfig() {
    return {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json"
        }
    };
}

const updateShop = async (shop) => {
    const url = '/api/v1/member/users/me/shop';
    const resp = await axiosClient.post(url, {...shop}, getHeaderConfig())
    return resp;
}
const getShopDetail = async (shopId) => {
    const url = `/api/v1/public/shops/${shopId}`;
    const resp = await axiosClient.get(url);
    const data = await resp.data;
    return data;
}
export const shopService = {
    getOrders: getOrders,
    getOrderStatus: getOrderStatus,
    getFeedbacks: getFeedbacks,
    getProductDetail: getProductDetail,
    getShopDetail: getShopDetail,
    updateShop: updateShop,
}

