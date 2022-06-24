import axiosClient from "../api/axiosClient";
import authHeader from "./auth-header";

const AdminProductService = {
    getProducts: async (params) => {
        const url = `/api/v1/seller/products`;
        const resp = await axiosClient.get(url, {
            headers: authHeader(),
            params: params
        })
        return resp;
    }
}

export default AdminProductService;