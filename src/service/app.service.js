import axiosClient from "../api/axiosClient";

const appService = {

    validationInputField: async (inputName, value) => {
        const url = `/api/v1/public/users/registration/validation?input=${inputName}&value=${value}`;
        const data = await axiosClient.get(url);
        return data;
    }
}

export default appService;