import {store} from "../index";
import {ApplicationConstants} from "../reducers/app.reducer";


const setRedirectUrl = (url) => {
    store.dispatch({
            type: ApplicationConstants.SET_REDIRECT_URL,
            payload: url,
        }
    )
}
const clearRedirectPath = () => {
    store.dispatch({
            type: ApplicationConstants.CLEAR_REDIRECT_URL,
        }
    )
}


export const applicationAction = {
    setRedirectUrl: setRedirectUrl,
    clearRedirectPath: clearRedirectPath
}

