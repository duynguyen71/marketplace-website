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

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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


export default {
    logout,
    login,
    getCurrentUserDetail,
    registration,
    verificationAccount
}