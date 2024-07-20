const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload.token, user: action.payload.user };
        case 'REGISTER_SUCCESS':
            return { ...state, token: action.payload.token, user: action.payload.user };
        case 'LOGOUT':
            return { ...state, token: null, user: null };
        case 'AUTH_ERROR':
        case 'REGISTER_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
