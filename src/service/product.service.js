import axiosClient from "../api/axiosClient";

const productService = {

    getProductsByCategory: async (category) => {
        const url = `/api/v1/public/products?category=${category}`;
        const resp = await axiosClient.get(url);
        console.log(`get product by category: ${category} success ${resp}`);
        return resp;
    },

    getProductDetail: async (productId) => {
        const url = `/api/v1/public/products/${productId}`;
        const resp = await axiosClient.get(url);
        console.log('get product success ', resp);
        return resp;
    },

    getPurchaseQuantity: async (shopId, productId, modelId, quantity) => {
        const url = `/api/v1/public/product/purchase-quantity?shopId=${parseInt(
            shopId
        )}&productId=${parseInt(productId)}&modelId=${parseInt(
            modelId
        )}&quantity=${parseInt(quantity)}`;
        const resp = await axiosClient.get(url);
        return resp;

    },

    saveFile: async (file) => {
        const url = `/api/v1/public/files`;
        const formData = new FormData();
        formData.append("file", file);
        const resp = await axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return resp;
    },
    getBrands: async () => {
        const url = `/api/v1/public/brands`;
        const resp = await axiosClient.get(url);
        return resp;
    },
    saveProduct: async (product) => {
        const url = "/api/v1/seller/products";
        const resp = await axiosClient.post(
            url,
            {
                ...product,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return resp;
    },
    //get public product feedbacks
    getProductFeedbacks: async (productId) => {
        const url = `/api/v1/public/products/${productId}/feedbacks`;
        const resp = await axiosClient.get(url);
        const data = await resp.data;
        return data;
    },

    //send feed back
    //make sure user already have bought product
    sendFeedBack: async (productId, ratingStarts, comment, attachments) => {
        if (!productId || !ratingStarts || !comment) return;
        const url = `/api/v1/member/feedbacks`;
        try {
            const body = {
                "productId": productId,
                "comment": comment,
                "rating": ratingStarts
            }
            const resp = await axiosClient.post(url, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type":
                        "application/json",
                }
            });
            return resp;
        } catch (e) {
            throw  e;
        }

    }
}

const authorizationHeadersConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type":
            "application/json",
    }
});

export default productService;
