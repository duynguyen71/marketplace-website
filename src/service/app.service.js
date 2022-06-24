import axiosClient from "../api/axiosClient";

const appService = {

    validationInputField: async (inputName, value) => {
        const url = `/api/v1/public/users/registration/validation?input=${inputName}&value=${value}`;
        return await axiosClient.get(url);
    }
}

export default appService;