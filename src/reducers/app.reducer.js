import {AppConstants} from "../constants/app.constants";


const initState = {isLoading: false}
const appReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case AppConstants.IS_LOADING: {
            return {
                isLoading: true
            }
        }
        case AppConstants.LOADED : {
            return {
                isLoading: false
            };
        }
        default:
            return {
                isLoading: false
            }

    }

}