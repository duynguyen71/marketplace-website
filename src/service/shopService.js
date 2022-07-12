import axiosClient from "../api/axiosClient";


const getOrders = async (sort = "DESC") => {
    const url = `/api/v1/member/users/me/shop/orders?direction=${sort}`;
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


const registrationShop = async (shop) => {
    const url = "/api/v1/member/shops/registration";
    const resp = await axiosClient.post(url, {...shop}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-Type": "application/json"
        }
    });
    const data = await resp.data;
    return data;
}
const activateShop = async (code) => {
    const url = "/api/v1/member/shops/registration/verification";
    const resp = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "code": code,
        }
    })
}
const getOrderItems = async (orderId) => {
    const url = `/api/v1/member/users/me/shop/orders/${orderId}/items`;
    const resp = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    const data = await resp.data;
    return data;
}
const updateOrderItemsStatus = async (orderId, status) => {
    const url = `/api/v1/member/users/me/shop/orders/${orderId}/items/status`;
    const resp = await axiosClient.put(url, {
        "status": status,
    }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    const data = await resp.data;
    return data;
}
const getOrder = async (orderId) => {
    const url = `/api/v1/member/users/me/shop/orders/${orderId}`;
    const resp = await axiosClient.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        }
    });
    const data = await resp.data;
    return data;
}
export const shopService = {
    getOrders: getOrders,
    getOrder: getOrder,
    getOrderStatus: getOrderStatus,
    getFeedbacks: getFeedbacks,
    getProductDetail: getProductDetail,
    getShopDetail: getShopDetail,
    updateShop: updateShop,
    registrationShop: registrationShop,
    activateShop: activateShop,
    getOrderItems: getOrderItems,
    updateOrderItemsStatus: updateOrderItemsStatus

}

