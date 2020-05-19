import { AuthState } from "reducer/auth.reducer.type"
import { AUTH_ACTION } from "action/auth.action.type";

const authReducer = (state: AuthState = {}, action: AUTH_ACTION) => {
    switch (action.type) {
        case "GET_INFO":
            return {
                ...state,
                profile: action.data
            }

        default:
            return state;
    }
}

export default authReducer
