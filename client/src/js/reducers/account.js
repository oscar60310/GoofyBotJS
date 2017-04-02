export default function reducer(state = { login: false }, action) {
    switch (action.type) {
        case "CHECK_LOGIN_PENDING": {
            return { ...state, pending: true }
        }
        case "CHECK_LOGIN_FULFILLED": {
            return {
                ...state,
                displayName: (action.payload.data.login) ? action.payload.data.displayName: "LOGIN",
                login: action.payload.data.login,
                url: action.payload.data.loginUrl,
                pending: false
            };
        }
    }
    return state;
}