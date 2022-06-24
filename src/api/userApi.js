import axiosClient from "./axiosClient";

const userApi = {
    login(email, password) {
        const url = `/api/v1/public/login`
        return axiosClient.post(url, {
            email: email,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
export default userApi;