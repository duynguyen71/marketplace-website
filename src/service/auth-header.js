export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = localStorage.getItem('access_token');
    if (user && accessToken) {
        return {
            Authorization: `Bearer ${accessToken}`
        }
    } else {
        return {};
    }
}