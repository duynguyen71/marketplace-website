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
export const shopService = {
    getOrders: getOrders,
    getOrderStatus: getOrderStatus,
    getFeedbacks: getFeedbacks,
    getProductDetail: getProductDetail
}

