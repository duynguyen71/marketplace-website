export const ApplicationConstants = {
    SET_REDIRECT_URL: 'SET_REDIRECT_URL',
    CLEAR_REDIRECT_URL: 'CLEAR_REDIRECT_URL',
}

const initState = {isLoading: false, redirectUrl: ''}
const applicationReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ApplicationConstants.SET_REDIRECT_URL: {
            return {
                ...initState,
                redirectUrl: payload
            }
        }
        case ApplicationConstants.CLEAR_REDIRECT_URL: {
            return {
                ...initState,
                redirectUrl: '',
            }
        }
        default:
            return {...state};

    }
}

export default applicationReducer;