const Reducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: ''
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: ''
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: ''
            }
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            }
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: ''
            }
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default Reducer;