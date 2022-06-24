import axiosClient from "../api/axiosClient";

const categoryService = {

    getCategories: async () => {
        const url = '/api/v1/public/categories';
        const resp = await axiosClient.get(url);
        return resp.data;
    }
}
export default categoryService;